import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
        setIsLoading(true); // Start loading

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
            setIsLoading(false); // Stop loading once sorted
        }, 1000); // Simulated delay to mimic fetching
    }, [matches]);

    // Determine row colors for the top 3
    const getRowColor = (index: number) => {
        switch (index) {
            case 0:
                return "bg-yellow-200"; // Gold
            case 1:
                return "bg-gray-200"; // Silver
            case 2:
                return "bg-orange-200"; // Bronze
            default:
                return "bg-gray-100"; // Default background
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {isLoading || sortedTeams.length === 0 ? (
                // ShadCN Skeleton Loader
                Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-100">
                        {/* Rank Skeleton */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-6 h-6 rounded" />
                            <Skeleton className="w-24 h-5 rounded" />
                        </div>
                        {/* Total Points Skeleton */}
                        <Skeleton className="w-12 h-5 rounded" />
                    </div>
                ))
            ) : (
                sortedTeams.map((team, index) => (
                    <div
                        key={team.id}
                        className={`flex items-center justify-between px-4 py-2 rounded-lg ${getRowColor(
                            index
                        )}`}
                    >
                        {/* Rank */}
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-gray-700">{index + 1}.</span>
                            <span className="text-sm font-medium text-gray-800">{team.name}</span>
                        </div>
                        {/* Total Points */}
                        <span className="text-sm font-bold text-gray-700">{team.totalPoints} pts</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default Leaderboard;