/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { useAuth } from '../hooks/useAuth';
import { Match } from '../utils/interfaces';

export default function VolleyballContent() {
    const [podiumData, setPodiumData] = useState<{ team: string; rank: number; title: string; score: number; color: string; }[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const { socket, connected } = useSocket();
    const { isAuthenticated } = useAuth();
    const [isComplate, setIsComplate] = useState(false);

    const fetchData = async () => {
        try {
            const response = await api.get('api/v1/match/VB');
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
                if (message.event === 'matchScoresUpdated' && message.data.sport === 'VB') {
                    fetchData();
                }
            };

            return () => {
                socket.onmessage = null;
            };
        }
    }, [socket]);

    // Listen for match score updates from WebSocket
    useEffect(() => {
        // Check if all matches are completed
        setIsComplate(matches.every(match => match.completed));

        // Aggregate points for each team
        const teamPoints = matches.reduce<Record<string, { name: string; points: number }>>(
            (acc, match) => {
                match.participants.forEach((participant) => {
                    const teamId = participant.team?.id ?? "unknown";
                    const teamName = participant.team?.name ?? "Unknown";
                    const points = participant.points ?? 0;

                    if (!acc[teamId]) {
                        acc[teamId] = { name: teamName, points: 0 };
                    }
                    acc[teamId].points += points;
                });
                return acc;
            },
            {}
        );

        // Sort teams based on points (descending order)
        let sortedTeams = Object.entries(teamPoints)
            .map(([id, { name, points }]) => ({
                id,
                name,
                points,
            }))
            .sort((a, b) => b.points - a.points) // Highest points first
            .map((team, index) => {
                // Assign colors based on team names
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

                // Assign ranking titles
                const titles = [
                    "ชนะเลิศอันดับที่ 1",
                    "รองชนะเลิศอันดับที่ 1",
                    "รองชนะเลิศอันดับที่ 2",
                    "รองชนะเลิศอันดับที่ 3",
                    "รองชนะเลิศอันดับที่ 4",
                ];
                const title = titles[index] || `อันดับที่ ${index + 1}`;

                return {
                    team: team.name,
                    rank: index + 1,
                    title,
                    score: team.points,
                    color,
                };
            });

        // Ensure rank consistency for teams with equal points
        sortedTeams = sortedTeams.map((team, index, arr) => {
            if (index > 0 && team.score === arr[index - 1].score) {
                team.rank = arr[index - 1].rank;
            }
            return team;
        });

        // Update state
        setPodiumData(sortedTeams);
        setLoading(false);
    }, [matches]);

    useEffect(() => {
        // Check if all matches are completed
        setIsComplate(matches.every(match => match.completed));

        // Aggregate points for each team
        const teamPoints = matches.reduce<Record<string, { name: string; points: number }>>(
            (acc, match) => {
                match.participants.forEach((participant) => {
                    const teamId = participant.team?.id ?? "unknown";
                    const teamName = participant.team?.name ?? "Unknown";
                    const points = participant.points ?? 0;

                    if (!acc[teamId]) {
                        acc[teamId] = { name: teamName, points: 0 };
                    }
                    acc[teamId].points += points;
                });
                return acc;
            },
            {}
        );

        // Sort teams based on points (descending order)
        let sortedTeams = Object.entries(teamPoints)
            .map(([id, { name, points }]) => ({
                id,
                name,
                points,
            }))
            .sort((a, b) => b.points - a.points) // Highest points first
            .map((team, index) => {
                // Assign colors based on team names
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

                // Assign ranking titles
                const titles = [
                    "ชนะเลิศอันดับที่ 1",
                    "รองชนะเลิศอันดับที่ 1",
                    "รองชนะเลิศอันดับที่ 2",
                    "รองชนะเลิศอันดับที่ 3",
                    "รองชนะเลิศอันดับที่ 4",
                ];
                const title = titles[index] || `อันดับที่ ${index + 1}`;

                return {
                    team: team.name,
                    rank: index + 1,
                    title,
                    score: team.points,
                    color,
                };
            });

        // Ensure rank consistency for teams with equal points
        sortedTeams = sortedTeams.map((team, index, arr) => {
            if (index > 0 && team.score === arr[index - 1].score) {
                team.rank = arr[index - 1].rank;
            }
            return team;
        });

        // Update state
        setPodiumData(sortedTeams);
        setLoading(false);
    }, [matches]);

    useEffect(() => {
        fetchData();
    }, [])

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
            <p className="text-center text-4xl font-semibold mb-4">วอลเลย์บอล</p>

            {/* Podium Section */}
            <Card className="mt-4">
                <CardContent>
                    <LiveBadge title="ผลการแข่งขัน">
                        {(isComplate || isAuthenticated) && (
                            <Podium teams={podiumData} isLoading={loading} />
                        )}
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

            {/* Rules Section */}
            <Card className="mt-4">
                <CardContent>
                    <Section title="กติกาการแข่งขันวอลเลย์บอล">
                        <Subsection title="1. ระเบียบและกติกาการแข่งขัน">
                            <RuleItem>
                                การแข่งขันประเภททีมผสม (ชายและหญิง)
                            </RuleItem>
                            <RuleItem>
                                ผู้เล่นในสนามต้องมีทั้งชายและหญิงอย่างน้อย 2 คนต่อทีม
                            </RuleItem>
                        </Subsection>
                        <Subsection title="2. จำนวนผู้เข้าแข่งขัน">
                            <RuleItem>
                                แต่ละทีมต้องมีผู้เล่นทั้งหมด 12 คน แบ่งเป็นผู้เล่นตัวจริง 6 คนและตัวสำรอง 6 คน
                            </RuleItem>
                            <RuleItem>
                                สามารถเปลี่ยนตัวผู้เล่นเข้าออกได้ไม่เกิน 6 ครั้งต่อเซ็ต
                            </RuleItem>
                        </Subsection>
                        <Subsection title="3. วิธีการจัดการแข่งขัน">
                            <RuleItem>ใช้ระบบแพ้คัดออก</RuleItem>
                            <RuleItem>
                                แข่งขัน 3 เซ็ต (Best of 3) เซ็ตละ 25 แต้ม โดยทีมที่ชนะ 2 ใน 3 เซ็ตถือเป็นผู้ชนะ
                            </RuleItem>
                            <RuleItem>
                                ในกรณีเซ็ตสุดท้าย (เซ็ตที่ 3) เล่นถึง 15 แต้ม โดยต้องชนะห่างอย่างน้อย 2 แต้ม
                            </RuleItem>
                        </Subsection>
                        <Subsection title="4. ชุดการแข่งขัน">
                            <RuleItem>
                                ชุดแข่งต้องแสดงสีของทีมชัดเจนและมีหมายเลขติดที่เสื้อ (หมายเลข 1-99)
                            </RuleItem>
                            <RuleItem>
                                ผู้เล่นต้องสวมรองเท้ากีฬาหุ้มส้นที่เหมาะสมสำหรับการเล่นวอลเลย์บอล
                            </RuleItem>
                        </Subsection>
                        <Subsection title="5. ข้อปฏิบัติในการแข่งขัน">
                            <RuleItem>
                                ผู้เล่นทุกคนต้องยอมรับคำตัดสินของกรรมการและปฏิบัติตามกติกาอย่างเคร่งครัด
                            </RuleItem>
                            <RuleItem>
                                หากทีมใดไม่พร้อมแข่งขันหรือไม่ลงแข่งขันตามเวลาที่กำหนดโดยไม่มีเหตุอันสมควร จะถูกปรับแพ้ทันที
                            </RuleItem>
                            <RuleItem>ผู้เล่นต้องประพฤติดีและแสดงน้ำใจนักกีฬา</RuleItem>
                        </Subsection>
                        <Subsection title="6. กรรมการตัดสินและเจ้าหน้าที่">
                            <RuleItem>
                                การตัดสินให้อยู่ในดุลยพินิจของคณะกรรมการจัดการแข่งขัน และถือเป็นที่สิ้นสุด
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
    return <li>{children}</li>;
}
