import { Request, Response } from "express";
import { MatchService } from "../services/macth.service";
import { assignRanksAndPoints, calculatePoints } from "../../utils/rank-score.util";
import { AuditLog } from "../../utils/interface";


interface Score {
    teamId: string;
    score: number;
    rank: string;
}


export class MacthController {
    private matchService: MatchService;

    constructor(matchService: MatchService) {
        this.matchService = matchService;

        this.getMacthBySportSlug = this.getMacthBySportSlug.bind(this);
        this.createMatchWithParticipants = this.createMatchWithParticipants.bind(this);
        this.getMatchById = this.getMatchById.bind(this);
        this.updateMatch = this.updateMatch.bind(this);
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
            const { matches, sport } = await this.matchService.getMacthBySportSlug(sportSlug);

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
                rank: participant.rank ?? 0,
                points: participant.points ?? 0,
            }));

            // Merge the provided scores with existing participant data
            const mergedScores = match.participants.map((participant) => {
                const updatedScore = scores.find((s) => s.teamId === participant.teamId);

                // Use provided score or retain existing score
                const score = updatedScore?.score ?? participant.score;

                // If rank is not provided, default to 0
                const rank = updatedScore?.rank ?? null;

                // Calculate points only if rank is provided and valid
                const points = rank !== 0
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
                        rank: original?.rank ?? 0,
                        points: original?.points ?? 0,
                        teamName: original?.teamName ?? 'Unknown',
                    },
                    updated: {
                        score: updated.score ?? 0,
                        rank: updated.rank ?? 0,
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
                    teamId: participant.teamId ?? '',
                    score: participant.score ?? 0,
                    points: participant.points ?? 0,
                    rank: participant.rank !== null ? participant.rank.toString() : '',
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
}
