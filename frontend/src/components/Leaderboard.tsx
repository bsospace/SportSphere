import React from "react";

interface Team {
    id: string;
    name: string;
}

interface Participant {
    id: string;
    team: Team;
    score?: number;
    point?: number;
}

interface Match {
    id: string;
    participants: Participant[];
}

interface LeaderboardProps {
    matches: Match[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ matches }) => {
    // Aggregate scores for each team
    const teamPoints = matches.reduce<Record<string, { name: string; totalPoints: number }>>(
        (acc, match) => {
            match.participants.forEach((participant) => {
                const teamId = participant.team.id;
                const teamName = participant.team.name;
                const point = participant.point ?? 0;

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
    const sortedTeams = Object.entries(teamPoints)
        .map(([id, { name, totalPoints }]) => ({ id, name, totalPoints }))
        .sort((a, b) => b.totalPoints - a.totalPoints);

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
        <div>
            {sortedTeams.length === 0 ? (
                <p className="text-gray-500">No data available.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {sortedTeams.map((team, index) => (
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
