import React from "react";

export default function MatchPage() {
    // Define types
    type Team = string | null;
    type Match = [Team, Team];
    type Round = Match[];

    // Initial Teams for Round 1
    const initialTeams: Team[] = [
        "Team A", "Team B", "Team C", "Team D",
        "Team E", "Team F", "Team G", "Team H",
        "Team I", "Team J", null, null, null, null, null, null
    ];

    // Build matches for each round
    const createMatches = (teams: Team[]): Round => {
        const matches: Round = [];
        for (let i = 0; i < teams.length; i += 2) {
            matches.push([teams[i], teams[i + 1]]);
        }
        return matches;
    };

    // Simulate winners for the next round
    const getNextRoundTeams = (matches: Round): Team[] => {
        return matches.map(([team1, team2]) => {
            if (!team1 || !team2) return null; // Handle null matches
            return `${team1} / ${team2}`; // Placeholder winner logic
        });
    };

    // Build the tournament rounds
    const rounds: Round[] = [];
    let currentTeams = initialTeams;
    while (currentTeams.length > 1) {
        const matches = createMatches(currentTeams);
        rounds.push(matches);
        currentTeams = getNextRoundTeams(matches);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
                Tournament 🏅
            </h1>

            <div className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                    Bracket
                </h2>

                {/* Bracket Structure */}
                <div className="flex flex-row justify-center items-start space-x-8">
                    {rounds.map((round, roundIndex) => (
                        <div key={roundIndex} className="flex flex-col items-center space-y-4">
                            <h3 className="text-lg font-bold mb-2 text-gray-600">
                                {roundIndex === rounds.length - 1
                                    ? "Finals"
                                    : roundIndex === rounds.length - 2
                                    ? "Semifinals"
                                    : `Round ${roundIndex + 1}`}
                            </h3>
                            {round.map((match, matchIndex) => (
                                <div
                                    key={matchIndex}
                                    className="p-4 w-48 text-center bg-gray-200 rounded-lg shadow-md"
                                >
                                    {match[0] || "TBD"} vs {match[1] || "TBD"}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}