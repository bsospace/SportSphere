import { PrismaClient, Match, MatchParticipant } from "@prisma/client";
import { handleError } from "../../utils/error-handler.util";
import { AuditLog } from "../../utils/interface";
import { InputJsonValue } from "@prisma/client/runtime/library";


export class MatchService {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }


    public async getMacthBySportSlug(sportSlug: string) {
        try {
            const sport = await this.prismaClient.sport.findUnique({
                where: { slug: sportSlug },
            });

            if (!sport) {
                throw handleError(`Sport with slug ${sportSlug} not found`, 404);
            }

            const matches = await this.prismaClient.match.findMany({
                where: { sportId: sport.id },
                include: {
                    participants: {
                        include: { team: true },
                    }
                },
            });

            return { matches, sport };
        } catch (error) {
            console.error("Error fetching matches:", error);
            throw new Error("Failed to fetch matches.");
        }
    }

    public async getMatchById(id: string) {
        try {
            const match = await this.prismaClient.match.findUnique({
                where: { id },
                include: {
                    participants: {
                        include: { team: true },
                    }
                },
            });

            if (!match) {
                throw handleError(`Match with ID ${id} not found`, 404);
            }

            return match;
        } catch (error) {
            console.error("Error fetching match:", error);
            throw new Error("Failed to fetch match.");
        }
    }

    public async getMatchWithParticipants(id: string) {
        try {
            const match = await this.prismaClient.match.findUnique({
                where: { id },
                include: {
                    participants: {
                        include: { team: true },
                    },
                },
            });

            if (!match) {
                throw new Error(`Match with ID ${id} not found.`);
            }

            return match;
        } catch (error) {
            console.error("Error fetching match with participants:", error);
            throw new Error("Failed to fetch match with participants.");
        }
    }

    /**
     * Create a new match with multiple participants.
     * @param sportId - The ID of the sport.
     * @param participantTeamIds - Array of team IDs participating in the match.
     * @param date - The date of the match.
     * @param time - The time of the match.
     * @returns The created match object.
     */
    public async createMatchWithParticipants(
        sportId: string,
        participantTeamIds: string[],
        date: Date,
        time: string
    ): Promise<Match> {
        try {
            // Ensure at least two teams are provided
            if (participantTeamIds.length < 2) {
                throw new Error("A match must have at least two participants.");
            }

            const match = await this.prismaClient.match.create({
                data: {
                    sportId,
                    type: "duel",
                    participants: {
                        create: participantTeamIds.map((teamId) => ({
                            teamId,
                            Points: 0,
                            Score: 0,
                        })),
                    },
                    createdAt: date,
                    updatedAt: date,
                    date: time,
                    matchName: "Match",
                },
            });

            return match;
        } catch (error) {
            console.error("Error creating match with participants:", error);
            throw new Error("Failed to create match.");
        }
    }

    /**
     * Update scores and points for participants in a match.
     * @param matchId - The ID of the match.
     * @param scores - Array of objects with teamId and their corresponding scores.
     * @param points - Array of objects with teamId and their corresponding points.
     * @param rank - Array of objects with teamId and their corresponding rank.
     * @returns Updated match participants.
     */

    public async updateMatchScores(
        matchId: string,
        scores: { teamId: string; score: number; points: number; rank: string }[],
        auditLog: AuditLog[]
    ): Promise<MatchParticipant[]> {
        try {
            const participants = await this.prismaClient.matchParticipant.findMany({
                where: { matchId },
            });

            if (participants.length === 0) {
                throw new Error("No participants found for the match.");
            }

            // Update scores, points, and ranks for all participants
            for (const scoreData of scores) {
                const participant = participants.find((p) => p.teamId === scoreData.teamId);
                if (!participant) {
                    throw new Error(`Participant with teamId ${scoreData.teamId} not found in the match.`);
                }

                let existingAuditLogData: InputJsonValue[] = participant.auditLogs as InputJsonValue[];
                existingAuditLogData.push(JSON.stringify(auditLog));

                await this.prismaClient.matchParticipant.update({
                    where: { id: participant.id },
                    data: {
                        score: scoreData.score,
                        points: scoreData.points,
                        rank: scoreData.rank,
                        auditLogs: existingAuditLogData,
                    },
                });
            }

            // Retrieve the updated participants for validation
            const updatedParticipants = await this.prismaClient.matchParticipant.findMany({
                where: { matchId },
                orderBy: { score: "desc" },
                include: { team: true },
            });

            await this.triggerScoreUpdateHook(updatedParticipants);

            return updatedParticipants;
        } catch (error) {
            console.error("Error updating match scores:", error);
            throw new Error("Failed to update match scores.");
        }
    }

    /**
 * Hook to handle actions when scores are updated.
 * For example, broadcast changes to connected WebSocket clients.
 */
    private async triggerScoreUpdateHook(participants: MatchParticipant[]): Promise<void> {
        try {


            // Example: Log or broadcast the changes (you can replace this with actual WebSocket or messaging logic)
            console.log(`[HOOK] Scores updated for Match ID: ${participants[0].matchId}`);

            // Broadcast to WebSocket clients (replace with your actual WebSocket logic)
            interface WebSocketServer {
                clients: Set<WebSocket>;
            }

            if ((global as any).wss as WebSocketServer) {
                (global as any).wss.clients.forEach((client: WebSocket) => {
                    if (client.readyState === 1) {
                        client.send(
                            JSON.stringify({
                                event: "matchScoresUpdated",
                                data: participants,
                            })
                        );
                    }
                });
            }
        } catch (error) {
            console.error(`[HOOK ERROR] Failed to execute score update hook:`, error);
        }
    }
}