"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const teams = [
    { id: 1, name: "Team A" },
    { id: 2, name: "Team B" },
    { id: 3, name: "Team C" }, // เพิ่มทีม C
    { id: 4, name: "Team D" }, // เพิ่มทีม D
];

const matches = [
    {
        id: 1,
        name: "Match 1",
        teams: [
            { id: 1, name: "Team A", score: 2, rank: 1 },
            { id: 2, name: "Team B", score: 3, rank: 4 },
            { id: 3, name: "Team C", score: 1, rank: 3 },
            { id: 4, name: "Team D", score: 3, rank: 3 },
        ],
        location: "Stadium A",
        time: "2025-01-27 18:00",
    },
];

export default function EditMatchScorePage() {
    const { id } = useParams() as { id: string };
    const [matchData, setMatchData] = useState<any>(null);
    const [teamScores, setTeamScores] = useState<{ [key: number]: number }>({});
    const [teamRanks, setTeamRanks] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const match = matches.find((m) => m.id.toString() === id);
        if (match) {
            setMatchData(match);
            const scores: { [key: number]: number } = {};
            const ranks: { [key: number]: number } = {};
            match.teams.forEach((team) => {
                scores[team.id] = team.score;
                ranks[team.id] = team.rank;
            });
            setTeamScores(scores);
            setTeamRanks(ranks);
        }
    }, [id]);

    const handleScoreChange = (teamId: number, e: any) => {
        const newScores = { ...teamScores, [teamId]: Number(e.target.value) };
        setTeamScores(newScores);
    };

    const handleRankChange = (teamId: number, e: any) => {
        const newRanks = { ...teamRanks, [teamId]: Number(e.target.value) };
        setTeamRanks(newRanks);
    };

    const increaseScore = (teamId: number) => {
        setTeamScores((prevScores) => ({
            ...prevScores,
            [teamId]: prevScores[teamId] + 1,
        }));
    };

    const decreaseScore = (teamId: number) => {
        setTeamScores((prevScores) => ({
            ...prevScores,
            [teamId]: Math.max(prevScores[teamId] - 1, 0),
        }));
    };

    const saveScore = () => {
        alert(
            `Saved scores: ${Object.keys(teamScores)
                .map(
                    (teamId) =>
                        `Team ${teamId}: ${teamScores[teamId]} (Rank: ${teamRanks[teamId]})`
                )
                .join(", ")}`
        );
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 min-h-screen p-8">
            {matchData ? (
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">แก้ไขคะแนนการแข่งขัน</h1>

                    {/* Grid layout for cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className="p-6 bg-blue-50 rounded-lg shadow-md"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">{team.name}</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-600">คะแนน</label>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => decreaseScore(team.id)}
                                            className="bg-blue-500 text-white p-3 rounded-md focus:outline-none hover:bg-blue-700"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={teamScores[team.id] || 0}
                                            onChange={(e) => handleScoreChange(team.id, e)}
                                            className="w-1/2 p-2 mx-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                        <button
                                            onClick={() => increaseScore(team.id)}
                                            className="bg-blue-500 text-white p-3 rounded-md focus:outline-none hover:bg-blue-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600">อันดับ</label>
                                    <select
                                        value={teamRanks[team.id] || 1}
                                        onChange={(e) => handleRankChange(team.id, e)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {teams.map((t, index) => (
                                            <option key={t.id} value={t.id}>
                                                {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={saveScore}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            บันทึกคะแนน
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl text-center text-gray-600">
                    <p>ไม่พบข้อมูลการแข่งขัน</p>
                </div>
            )}
        </div>
    );
}
