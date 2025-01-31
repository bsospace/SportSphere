/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import Podium from '@/components/Podium';
import { api } from '@/app/utils/api.util';
import { useSocket } from '../hooks/useSocket';
import { Loader2 } from 'lucide-react';
import MatchSchedule from '@/components/MatchSchedule';
import Leaderboard from '@/components/Leaderboard';

export default function ChairballContent() {
    const [podiumData, setPodiumData] = useState<{ team: string; rank: number; title: string; score: number; color: string; }[]>([]);
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { socket, connected } = useSocket();

    const fetchData = async () => {
        try {
            const response = await api.get('api/v1/match/CB');
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
                    if (message.data.sport === 'CB') {
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
            <p className="text-center text-4xl font-semibold mb-4">แชร์บอล</p>

            <Card className="mt-4">
                <CardContent>
                    <Section title="ผลการแข่งขัน">
                        <Podium teams={podiumData} />
                        <Leaderboard matches={matches} />
                    </Section>
                </CardContent>
            </Card>

            <Card className="mt-4">
                <CardContent>
                    <Section title="ตารางการแข่งขัน">
                        <MatchSchedule matches={sortedMatches} />
                    </Section>
                </CardContent>
            </Card>

            <Card className='mt-4'>
                <CardContent>
                    <Section title="กติกาการแข่งขันแชร์บอล">
                        <Subsection title="1. ระเบียบและกติกาการแข่งขัน">
                            <RuleItem>
                                ใช้กติกาการแข่งขันแชร์บอลตามที่กำหนดโดยสมาคมกีฬาแชร์บอลแห่งประเทศไทย
                            </RuleItem>
                            <RuleItem>
                                การแข่งขันเป็นประเภททีมผสม (ชายและหญิง)
                            </RuleItem>
                        </Subsection>
                        <Subsection title="2. จำนวนผู้เข้าแข่งขัน">
                            <RuleItem>
                                แต่ละทีมต้องมีผู้เล่นอย่างน้อย 7 คน (ผู้ชายลงได้ครั้งละไม่เกิน 3 คน)
                            </RuleItem>
                            <RuleItem>
                                สามารถเปลี่ยนตัวผู้เล่นเข้าออกได้ไม่จำกัดครั้ง
                            </RuleItem>
                        </Subsection>
                        <Subsection title="3. วิธีการจัดการแข่งขัน">
                            <RuleItem>
                                การแข่งขันใช้เวลา 2 ครึ่ง ครึ่งละ 15 นาที พักครึ่ง 5 นาที
                            </RuleItem>
                            <RuleItem>
                                แข่งขันแบบพบกันหมด หากเสมอจะตัดสินด้วยการยิงลูกแชร์บอล 5 ครั้งต่อทีม
                            </RuleItem>
                        </Subsection>
                        <Subsection title="4. ชุดการแข่งขัน">
                            <RuleItem>
                                ชุดแข่งต้องแสดงสีของทีมชัดเจน
                            </RuleItem>
                            <RuleItem>
                                ผู้เล่นต้องสวมรองเท้ากีฬาหุ้มส้น
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
