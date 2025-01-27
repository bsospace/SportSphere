import React from "react";

interface Team {
    id: string;
    name: string;
}

interface Participant {
    id: string;
    team: Team;
    rank?: number;
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
    const getBadgeText = (rank: number | undefined) => {
        if (!rank) return null;
        switch (rank) {
            case 1:
                return "1st Place 🥇";
            case 2:
                return "2nd Place 🥈";
            case 3:
                return "3rd Place 🥉";
            default:
                return `${rank}th Place`;
        }
    };

    return (
        <div>
            {matches.length === 0 ? (
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
                                            return a.rank - b.rank;
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
                                        {match.type === "free-for-all" && participant.rank && (
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded font-semibold">
                                                {getBadgeText(participant.rank)}
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
