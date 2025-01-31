import e, { Request, Response } from "express";
import { MatchService } from "../services/macth.service";
import { assignRanksAndPoints, calculatePoints } from '../../utils/rank-score.util';
import { AuditLog, SetScore } from "../../utils/interface";


interface SetScoreWithTeamId extends SetScore {
    teamId: string;
    setScores: number[];
}


export class MacthController {
    private matchService: MatchService;

    constructor(matchService: MatchService) {
        this.matchService = matchService;

        this.getMacthBySportSlug = this.getMacthBySportSlug.bind(this);
        this.createMatchWithParticipants = this.createMatchWithParticipants.bind(this);
        this.getMatchById = this.getMatchById.bind(this);
        this.updateMatch = this.updateMatch.bind(this);
        this.endMatch = this.endMatch.bind(this); 4
        this.updateSetScores = this.updateSetScores.bind(this);
    }

    /**
     * 
     * @param req - Request
     * @param res - Response
     * @returns - Returns all matches for a given sport
     */
    public async getMacthBySportSlug(req: Request, res: Response): Promise<any> {
        try {
            const sportSlug = req.params.sportSlug;
            const { audit } = req.query;

            //validate the request audit query
            if (audit && typeof audit !== 'string') {
                return res.status(400).json({ message: "Invalid audit query parameter." });
            }

            // Fetch matches based on the sport slug
            const result = await this.matchService.getMacthBySportSlug(sportSlug, audit as string);

            // Check if matches are found
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Matches not found',
                    error: 'Matches not found',
                });
            }

            const { matches, sport } = result;

            return res.status(200).json({
                success: true,
                message: 'Matches fetched successfully',
                data: { sport, matches, },
            });

        } catch (error) {
            console.error("Error fetching matches:", error);
            return res.status(500).json({ message: "Failed to fetch matches." });
        }
    }

    /**
     *  Get a match by ID
     * @param req - Request
     * @param res - Response
     * @returns - Returns a match by ID
     */

    public async getMatchById(req: Request, res: Response): Promise<any> {
        try {
            const matchId = req.params.id;


            const match = await this.matchService.getMatchById(matchId);

            return res.status(200).json({
                success: true,
                message: 'Match fetched successfully',
                data: match,
            });
        }
        catch (error) {
            console.error("Error fetching match:", error);
            return res.status(500).json({ message: "Failed to fetch match." });

        }
    }

    /**
     * Create a new match with multiple participants.
     * @param req - Request
     * @param res - Response
     * @returns - Returns the created match object.
     */

    public async createMatchWithParticipants(req: Request, res: Response) {
        try {
            const { sportId, participantTeamIds, date, time } = req.body;
            const match = await this.matchService.createMatchWithParticipants(
                sportId,
                participantTeamIds,
                date,
                time
            );
            return res.json(match);
        } catch (error) {
            console.error("Error creating match:", error);
            return res.status(500).json({ message: "Failed to create match." });
        }
    }

    public async updateMatch(req: Request, res: Response): Promise<any> {
        try {
            const { id, scores }: { id: string; scores: { teamId: string; score?: number; rank?: number }[] } = req.body;

            // Validate the request body for scores
            if (!Array.isArray(scores) || scores.length === 0) {
                return res.status(400).json({ message: "Invalid scores provided." });
            }

            // Fetch the match details along with participants
            const match = await this.matchService.getMatchWithParticipants(id);

            if (!match) {
                return res.status(404).json({ message: "Match not found." });
            }

            // Capture original scores for audit log comparison
            const originalScores = match.participants.map((participant) => ({
                teamId: participant.teamId,
                teamName: participant.team ? participant.team.name : 'Unknown',
                score: participant.score ?? 0,
                rank: participant.rank !== null && participant.rank !== '0' ? participant.rank : '',
                points: participant.points ?? 0,
            }));

            // Merge the provided scores with existing participant data
            const mergedScores = match.participants.map((participant) => {
                const updatedScore = scores.find((s) => s.teamId === participant.teamId);

                // if score is not provided, use the existing score
                const score = updatedScore?.score ?? participant.score;

                // if rank is not provided, use the existing rank
                const rank = updatedScore?.rank !== undefined && updatedScore.rank != 0 && updatedScore.rank !== 0
                    ? updatedScore.rank
                    : "";

                // Calculate points based on the rank
                const points = rank !== ""
                    ? calculatePoints(match.type as "duel" | "free-for-all", rank)
                    : 0;

                return {
                    teamId: participant.teamId,
                    score,
                    rank,
                    points,
                };
            });

            const user = req.user || null;

            // Generate audit log with detailed score changes
            const scoreChanges = mergedScores.map((updated) => {
                const original = originalScores.find((o) => o.teamId === updated.teamId);
                return {
                    teamId: updated.teamId,
                    previous: {
                        score: original?.score ?? 0,
                        rank: original?.rank ?? "",
                        points: original?.points ?? 0,
                        teamName: original?.teamName ?? 'Unknown',
                    },
                    updated: {
                        score: updated.score ?? 0,
                        rank: updated.rank ?? "",
                        points: updated.points ?? 0,
                        teamName: original?.teamName ?? 'Unknown',
                    },
                };
            });

            const auditLog: AuditLog = {
                timestamp: new Date().toISOString(),
                action: "update",
                service: "match",
                email: user?.email,
                userId: user?.id,
                ipAddress: req.ip,
                userAgent: req.get("User-Agent"),
                success: true,
                metadata: {
                    matchId: id,
                    scoreChanges,
                },
            };

            // Update the participants' scores, ranks, and points in the database
            const updatedParticipants = await this.matchService.updateMatchScores(
                id,
                mergedScores.map((participant) => ({
                    teamId: participant.teamId || '',
                    score: participant.score ?? 0,
                    points: participant.points ?? 0,
                    rank: participant.rank !== null && participant.rank != 0 ? participant.rank.toString() : '',
                }))
                , [auditLog]
            );

            // Refetch the match to get the updated state
            const updatedMatch = await this.matchService.getMatchWithParticipants(id);

            return res.json({
                success: true,
                message: "Match updated successfully.",
                matches: updatedMatch,
            });
        } catch (error) {
            console.error("Error updating match:", error);
            return res.status(500).json({ message: "Failed to update match." });
        }
    }

    public async updateSetScores(req: Request, res: Response): Promise<any> {
        try {
            const { setScores, ranks }: { setScores: SetScoreWithTeamId[], ranks: { teamId: string; rank?: number }[] } = req.body;
            const { id } = req.params;

            // ตรวจสอบค่าที่ได้รับมา
            if (!Array.isArray(setScores) || setScores.length === 0) {
                return res.status(400).json({ message: "Invalid set scores provided." });
            }

            // ดึงข้อมูลการแข่งขันจากฐานข้อมูล
            const match = await this.matchService.getMatchWithParticipants(id);
            if (!match) {
                return res.status(404).json({ message: "Match not found." });
            }

            // บันทึกคะแนนเดิมสำหรับการทำ audit log
            const originalSetScores = match.participants.map((participant) => ({
                teamId: participant.teamId,
                teamName: participant.team ? participant.team.name : 'Unknown',
                setScores: typeof participant.setScores === 'string'
                    ? JSON.parse(participant.setScores)
                    : participant.setScores ?? [],
            }));

            // อัปเดตคะแนนของแต่ละทีม
            const mergedSetScores = match.participants.map((participant) => {
                const updatedSetScores = setScores.find((s) => s.teamId === participant.teamId);
                const existingRank = ranks.find((r) => r.teamId === participant.teamId);
                const rankValue = existingRank?.rank !== undefined && !isNaN(Number(existingRank.rank))
                    ? Number(existingRank.rank)
                    : null;

                const rank = rankValue !== null ? rankValue.toString() : "";

                return {
                    teamId: participant.teamId,
                    setScores: updatedSetScores?.setScores ?? originalSetScores.find((o) => o.teamId === participant.teamId)?.setScores ?? [],
                    rank: rank,
                    points: existingRank?.rank !== undefined ? calculatePoints(match.type as "duel" | "free-for-all", existingRank.rank) : 0,
                };
            });

            const user = req.user || null;

            // บันทึก log การเปลี่ยนแปลง
            const setScoreChanges = mergedSetScores.map((updated) => {
                const original = originalSetScores.find((o) => o.teamId === updated.teamId);
                return {
                    teamId: updated.teamId,
                    previous: {
                        setScores: original?.setScores ?? [],
                        teamName: original?.teamName ?? 'Unknown',
                    },
                    updated: {
                        setScores: updated.setScores ?? [],
                        teamName: original?.teamName ?? 'Unknown',
                    },
                };
            });

            const auditLog: AuditLog = {
                timestamp: new Date().toISOString(),
                action: "update",
                service: "match",
                email: user?.email,
                userId: user?.id,
                ipAddress: req.ip,
                userAgent: req.get("User-Agent"),
                success: true,
                metadata: {
                    matchId: id,
                    setScoreChanges,
                },
            };

            // อัปเดตข้อมูลในฐานข้อมูล
            const updatedMatch = await this.matchService.updateMatchSetScores(
                id,
                mergedSetScores.map((participant) => ({
                    teamId: participant.teamId || '',
                    setScores: participant.setScores,
                    rank: participant.rank,
                    points: participant.points,
                })),
                [auditLog],
                match.sportId
            );

            // ดึงข้อมูลการแข่งขันที่อัปเดตแล้ว
            const updatedMatchWithParticipants = await this.matchService.getMatchWithParticipants(id);
            

            return res.json({
                success: true,
                message: "Set scores updated successfully.",
                data: updatedMatchWithParticipants,
            });
        } catch (error) {
            console.error("Error updating set scores:", error);
            return res.status(500).json({ message: "Failed to update set scores." });
        }
    }





    public async endMatch(req: Request, res: Response): Promise<any> {
        try {

            const { id } = req.params;
            const user = req.user || null;

            // validate the request body
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Failed to end match',
                    error: 'Invalid match ID provided',
                });
            }

            // find existing match
            const existingMatch = await this.matchService.getMatchById(id);
            if (!existingMatch) {
                return res.status(404).json({
                    success: false,
                    message: 'Failed to end match',
                    error: 'Match not found',
                });
            }

            const existingAuditLogs: AuditLog[] = ((existingMatch.auditLogs ?? []) as unknown as AuditLog[]).filter(log => log !== null);

            if (existingMatch.completed) {
                // Create audit log
                const auditLog: AuditLog = {
                    timestamp: new Date().toISOString(),
                    action: "make match not ended",
                    service: "match",
                    email: user?.email,
                    userId: user?.id,
                    ipAddress: req.ip,
                    userAgent: req.get("User-Agent"),
                    success: true,
                    metadata: {
                        matchId: id,
                    },
                };

                // Append new audit log to existing logs
                const updatedLogs = [...existingAuditLogs, auditLog];

                // End the match
                const match = await this.matchService.updateEndMatch(id, updatedLogs, existingMatch.sportId);

                return res.status(200).json({
                    success: true,
                    message: "Match is now marked as not ended",
                    data: match,
                });
            }

            // If match is not ended, end it now
            const auditLog: AuditLog = {
                timestamp: new Date().toISOString(),
                action: "end match",
                service: "match",
                email: user?.email,
                userId: user?.id,
                ipAddress: req.ip,
                userAgent: req.get("User-Agent"),
                success: true,
                metadata: {
                    matchId: id,
                },
            };

            // Append new audit log
            const updatedLogs = [...existingAuditLogs, auditLog];

            // End the match with a completed timestamp
            const match = await this.matchService.updateEndMatch(id, updatedLogs, existingMatch.sportId, new Date());

            return res.status(200).json({
                success: true,
                message: "Match ended successfully",
                data: match,
            });

        } catch (error) {
            console.error("Error ending match:", error);
            return res.status(500).json({ message: "Failed to end match." });
        }
    }
}
