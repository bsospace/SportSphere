/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "../../../utils/api.util";

export default function EditMatchScorePage() {
    const { slug, id } = useParams() as { slug: string; id: string };
    const [matchData, setMatchData] = useState<any>(null);
    const [teamScores, setTeamScores] = useState<{ [key: string]: number }>({});
    const [teamRanks, setTeamRanks] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        // Simulate fetching data based on slug and id
        const fetchMatchData = async () => {
            // Example API call (replace with your actual API)
            const response = await api.get(`/api/v1/match/${slug}/${id}`);
            const result = await response.data;

            if (result.success && result.data) {
                setMatchData(result.data);

                const scores: { [key: string]: number } = {};
                const ranks: { [key: string]: number } = {};

                result.data.participants.forEach((participant: any) => {
                    scores[participant.team.id] = participant.score || 0;
                    ranks[participant.team.id] = participant.rank || 1;
                });

                setTeamScores(scores);
                setTeamRanks(ranks);
            }
        };

        fetchMatchData();
    }, [slug, id]);

    const handleScoreChange = (teamId: string, e: any) => {
        const newScores = { ...teamScores, [teamId]: Number(e.target.value) };
        setTeamScores(newScores);
    };

    const handleRankChange = (teamId: string, e: any) => {
        const newRanks = { ...teamRanks, [teamId]: Number(e.target.value) };
        setTeamRanks(newRanks);
    };

    const increaseScore = (teamId: string) => {
        setTeamScores((prevScores) => ({
            ...prevScores,
            [teamId]: prevScores[teamId] + 1,
        }));
    };

    const decreaseScore = (teamId: string) => {
        setTeamScores((prevScores) => ({
            ...prevScores,
            [teamId]: Math.max(prevScores[teamId] - 1, 0),
        }));
    };

    const handleBack = () => {
        history.back();
    };

    const saveScore = async () => {
        const payload = {
            id: id,  // Pass the slug as the match identifier
            scores: [
                {
                    teamId: matchData.participants[0].team.id,
                    score: teamScores[matchData.participants[0].team.id],
                    rank: teamRanks[matchData.participants[0].team.id].toString(),
                },
                {
                    teamId: matchData.participants[1].team.id,
                    score: teamScores[matchData.participants[1].team.id],
                    rank: teamRanks[matchData.participants[1].team.id].toString(),
                }
            ]
        };

        try {
            const response = await api.put(`/api/v1/match/${id}/edit`, payload);
            if (response.data.success) {
                // Handle success (e.g., show a success message or update UI)
                alert("Scores saved successfully!");
            } else {
                // Handle error response from the API
                alert("Failed to save scores.");
            }
        } catch (error) {
            // Handle network or server error
            console.error("Error saving scores:", error);
            alert("An error occurred while saving scores.");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 min-h-screen p-8">
            {matchData ? (
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        แก้ไขคะแนนการแข่งขัน: {matchData.matchName}
                    </h1>

                    {/* Grid layout for cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matchData.participants.map((participant: any) => (
                            <div
                                key={participant.team.id}
                                className="p-6 bg-blue-50 rounded-lg shadow-md"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    {participant.team.name}
                                </h2>
                                <div className="mb-4">
                                    <label className="block text-gray-600">คะแนน</label>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() =>
                                                decreaseScore(participant.team.id)
                                            }
                                            className="bg-blue-500 text-white p-3 rounded-md focus:outline-none hover:bg-blue-700"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={teamScores[participant.team.id] || 0}
                                            onChange={(e) =>
                                                handleScoreChange(participant.team.id, e)
                                            }
                                            className="w-1/2 p-2 mx-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                        <button
                                            onClick={() =>
                                                increaseScore(participant.team.id)
                                            }
                                            className="bg-blue-500 text-white p-3 rounded-md focus:outline-none hover:bg-blue-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600">อันดับ</label>
                                    <select
                                        value={teamRanks[participant.team.id] || 1}
                                        onChange={(e) =>
                                            handleRankChange(participant.team.id, e)
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {matchData.type === "duel" ? (
                                            <>
                                                <option value={3}>ชนะ</option>
                                                <option value={0}>แพ้</option>
                                                <option value={1}>เสมอ</option>
                                            </>
                                        ) : (
                                            [1, 2, 3, 4, 5].map((rank) => (
                                                <option key={rank} value={rank}>
                                                    {`ที่ ` + rank}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-3 mt-8">
                        <button onClick={handleBack} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300">
                            กลับ
                        </button>
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
