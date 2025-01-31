/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from 'react';
import { api } from '@/app/utils/api.util';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import Podium from '@/components/Podium';
import MatchSchedule from '@/components/MatchSchedule';
import Leaderboard from '@/components/Leaderboard';
import { Loader2 } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';
import LiveBadge from '@/components/LiveBadge';

export default function LocalContent() {
    const [podiumData, setPodiumData] = useState<{ team: string; rank: number; title: string; score: number; color: string; }[]>([]);
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { socket, connected } = useSocket();

    const fetchData = async () => {
        try {
            const response = await api.get('api/v1/match/TG');
            const data = await response.data.data.matches;

            setMatches(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Listen for match score updates from WebSocket
    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.event === 'matchScoresUpdated') {
                    if(message.data.sport === 'TG'){
                        fetchData();
                    }
                }
            };

            return () => {
                socket.onmessage = null;
            };
        }
    }, [socket]);

    useEffect(() => {
        fetchData();

        const teamPoints = matches.reduce<Record<string, { name: string; points: number }>>(
            (acc, match) => {
                match.participants.forEach((participant) => {
                    const teamId = participant.team.id;
                    const teamName = participant.team.name;
                    const points = participant.point ?? 0;

                    if (!acc[teamId]) {
                        acc[teamId] = { name: teamName, points: 0 };
                    }
                    acc[teamId].points += points;
                });
                return acc;
            },
            {}
        );

        let sortedTeams = Object.entries(teamPoints)
            .map(([id, { name, points }]) => ({
                id,
                name,
                points,
            }))
            .sort((a, b) => b.points - a.points)
            .map((team, index) => {
                // Generate color from team name (temporary)
                const color = team.name.includes("เขียว")
                    ? "bg-green-300"
                    : team.name.includes("แดง")
                        ? "bg-red-300"
                        : team.name.includes("เหลือง")
                            ? "bg-yellow-300"
                            : team.name.includes("น้ำเงิน")
                                ? "bg-blue-300"
                                : team.name.includes("ชมพู")
                                    ? "bg-pink-300"
                                    : "bg-gray-300";

                // Generate title based on rank
                const titles = [
                    "ชนะเลิศอันดับที่ 1",
                    "รองชนะเลิศอันดับที่ 1",
                    "รองชนะเลิศอันดับที่ 2",
                    "รองชนะเลิศอันดับที่ 3",
                    "รองชนะเลิศอันดับที่ 4",
                ];
                const title = `${titles[index] || `อันดับที่ ${index + 1}`}`;

                return {
                    team: team.name,
                    rank: index + 1,
                    title,
                    score: team.points,
                    color,
                };
            });

        sortedTeams = [4, 2, 1, 3, 5]
            .map((rank) => sortedTeams.find((team) => team.rank === rank))
            .filter((team) => team !== undefined);

        setPodiumData(sortedTeams);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    const sortedMatches = matches?.sort((a: any, b: any) => {
        const numA = parseInt(a.id.replace(/\D/g, ""), 10);
        const numB = parseInt(b.id.replace(/\D/g, ""), 10);

        return numA - numB;
    });

    return (
        <div>
            <p className="text-center text-4xl font-semibold mb-4">กีฬาพื้นบ้าน</p>

            {/* Podium Section */}
            <Card className="mt-4">
                <CardContent>
                    <LiveBadge title="ผลการแข่งขัน">
                        <Podium teams={podiumData} />
                        <Leaderboard matches={matches} />
                    </LiveBadge>
                </CardContent>
            </Card>

            <Card className="mt-4">
                <CardContent>
                    <LiveBadge title="ตารางการแข่งขัน">
                        <MatchSchedule matches={sortedMatches} />
                    </LiveBadge>
                </CardContent>
            </Card>

            <Card className='mt-4'>
                <CardContent>
                    <Section title="กติกาการแข่งขัน">
                        <Subsection title="Coming Soon...">
                            <RuleItem>
                                Coming Soon...
                            </RuleItem>
                        </Subsection>
                    </Section>
                </CardContent>
            </Card>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold mt-4 mb-2">{title}</h2>
            {children}
        </div>
    );
}

function Subsection({ title, children }) {
    return (
        <div>
            <h1 className="text-xl font-semibold mt-4 mb-2">{title}</h1>
            <ul className="list-disc ml-4">{children}</ul>
        </div>
    );
}

function RuleItem({ children }) {
    return (
        <li>
            {children}
        </li>
    );
}
