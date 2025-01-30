import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import ShadCN Skeleton

interface Team {
    id: string;
    name: string;
}

interface Participant {
    id: string;
    team: Team;
    rank?: string;
    score?: number;
    point?: number;
}

interface Match {
    id: string;
    matchName: string;
    location: string | null;
    date: string;
    participants: Participant[];
    type: string | null;
}

interface MatchScheduleProps {
    matches: Match[];
}

const MatchSchedule: React.FC<MatchScheduleProps> = ({ matches }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Simulated loading delay
    }, []);

    // Function to get the badge text based on match type and rank
    const getBadgeText = (rank: string | undefined, matchType: string | null) => {
        if (!rank) return null;
        
        if (matchType?.toUpperCase() == "DUEL") {
            switch (rank) {
                case "1":
                    return "Winner 🏆";
                case "2":
                    return "Loser ❌";
                case "3":
                    return "Draw ⚖️";
                default:
                    return `Rank ${rank}`;
            }
        } else if (matchType == "free-for-all") {
            switch (rank) {
                case "1":
                    return "1st Place 🥇";
                case "2":
                    return "2nd Place 🥈";
                case "3":
                    return "3rd Place 🥉";
                default:
                    return `${rank}th Place`;
            }
        }
        return null;
    };

    return (
        <div>
            {isLoading ? (
                // Skeleton Loading
                Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="mt-4 flex flex-col gap-4 border-b border-gray-200 pb-4 mb-4">
                        {/* Match Info Skeleton */}
                        <div>
                            <Skeleton className="w-32 h-4 mb-2" />
                            <Skeleton className="w-64 h-5 mb-2" />
                            <Skeleton className="w-40 h-4" />
                        </div>

                        {/* Participating Teams Skeleton */}
                        <div className="flex flex-col gap-3">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
                                >
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="w-24 h-4" />
                                        <Skeleton className="w-12 h-4 rounded" />
                                    </div>
                                    <Skeleton className="w-6 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : matches.length === 0 ? (
                <p className="text-gray-500">No matches scheduled.</p>
            ) : (
                matches.map((match, index) => (
                    <div
                        key={match.id}
                        className="mt-4 flex flex-col gap-4 border-b border-gray-200 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
                    >
                        {/* Match Info */}
                        <div>
                            <p className="text-sm text-gray-500">{match.date}</p>
                            <h3 className="text-lg font-medium">
                                แมชท์ที่ {index + 1} | {match.matchName}
                            </h3>
                            <p className="text-sm text-gray-600">
                                📍{match.location ?? "Location not specified"}
                            </p>
                        </div>

                        {/* Participating Teams and Scores */}
                        <div className="flex flex-col gap-4">
                            {(
                                match.type === "free-for-all"
                                    ? match.participants
                                        .slice()
                                        .sort((a, b) => {
                                            if (a.rank == null && b.rank == null) return 0;
                                            if (a.rank == null) return 1;
                                            if (b.rank == null) return -1;
                                            return parseInt(a.rank, 10) - parseInt(b.rank, 10);
                                        })
                                    : match.participants
                            ).map((participant) => (
                                <div
                                    key={participant.id}
                                    className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
                                >
                                    <div className="flex items-center gap-2">
                                        {/* Team Name */}
                                        <span className="text-sm font-medium text-gray-800">
                                            {participant.team.name}
                                        </span>
                                        {/* Badge for Rank */}
                                        {participant.rank && (
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded font-semibold">
                                                {getBadgeText(participant.rank, match.type)}
                                            </span>
                                        )}
                                    </div>
                                    {/* Score */}
                                    <span className="text-sm font-bold text-gray-700">
                                        {participant.score ?? "0"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MatchSchedule;