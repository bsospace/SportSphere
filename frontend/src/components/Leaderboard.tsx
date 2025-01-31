import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

interface Team {
    id: string;
    name: string;
}

interface Participant {
    id: string;
    team: Team;
    score?: number;
    points?: number;
}

interface Match {
    id: string;
    participants: Participant[];
}

interface LeaderboardProps {
    matches: Match[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ matches }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [sortedTeams, setSortedTeams] = useState<{ id: string; name: string; totalPoints: number }[]>([]);

    useEffect(() => {
        setTimeout(() => {
            // Aggregate scores for each team
            const teamPoints = matches.reduce<Record<string, { name: string; totalPoints: number }>>(
                (acc, match) => {
                    match.participants.forEach((participant) => {
                        const teamId = participant.team.id;
                        const teamName = participant.team.name;
                        const point = participant.points ?? 0;

                        if (!acc[teamId]) {
                            acc[teamId] = { name: teamName, totalPoints: 0 };
                        }
                        acc[teamId].totalPoints += point;
                    });

                    return acc;
                },
                {}
            );

            // Sort teams by total points in descending order
            const sorted = Object.entries(teamPoints)
                .map(([id, { name, totalPoints }]) => ({ id, name, totalPoints }))
                .sort((a, b) => b.totalPoints - a.totalPoints);

            setSortedTeams(sorted);
            setIsLoading(false);
        }, 1000);
    }, [matches]);

    // Determine row colors for the top 3
    const getRowColor = (index: number, teamName: string) => {
        // Determine color based on team name
        let teamColor = "bg-gray-300"; // Default color for teams not matching specific colors
    
        if (teamName.includes("เขียว")) {
            teamColor = "bg-green-300";
        } else if (teamName.includes("แดง")) {
            teamColor = "bg-red-300";
        } else if (teamName.includes("เหลือง")) {
            teamColor = "bg-yellow-300";
        } else if (teamName.includes("น้ำเงิน")) {
            teamColor = "bg-blue-300";
        } else if (teamName.includes("ชมพู")) {
            teamColor = "bg-pink-300";
        }
        return teamColor;
    }

    return (
        <div className="flex flex-col gap-4">
            <AnimatePresence>
                {isLoading || sortedTeams.length === 0 ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={`skeleton-${index}`}
                            className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-100"
                        >
                            <div className="flex items-center gap-4">
                                <Skeleton className="w-6 h-6 rounded" />
                                <Skeleton className="w-24 h-5 rounded" />
                            </div>
                            <Skeleton className="w-12 h-5 rounded" />
                        </div>
                    ))
                ) : (
                    sortedTeams.map((team, index) => (
                        <motion.div
                            key={team.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                duration: 0.3
                            }}
                            className={`flex items-center justify-between px-4 py-2 rounded-lg ${getRowColor(index, team.name)}`}
                        >
                            <div className="flex items-center gap-4">
                                <motion.span
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="text-lg font-bold text-gray-700"
                                >
                                    {index + 1}.
                                </motion.span>
                                <span className="text-sm font-medium text-gray-800">{team.name}</span>
                            </div>
                            <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="text-sm font-bold text-gray-700"
                            >
                                {team.totalPoints} pts
                            </motion.span>
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    );
};

export default Leaderboard;