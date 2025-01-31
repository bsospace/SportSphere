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

export default function BasketballContent() {
    const [podiumData, setPodiumData] = useState<{ team: string; rank: number; title: string; score: number; color: string; }[]>([]);
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { socket, connected } = useSocket();

    const fetchData = async () => {
        try {
            const response = await api.get('api/v1/match/BK');
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
                    if(message.data.sport === 'BK'){
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
            <p className="text-center text-4xl font-semibold mb-4">บาสเกตบอล</p>

            {/* Podium Section */}
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

            {/* Rules Section */}
            <Card className="mt-4">
                <CardContent>
                    <Section title="กติกาการแข่งขันบาสเกตบอล">
                        <Subsection title="1. ระเบียบและกติกาการแข่งขัน">
                            <RuleItem>
                                ใช้ระเบียบคณะกรรมการฝ่ายเทคนิคกีฬาวิทยาศาสตร์สัมพันธ์แห่งประเทศไทยว่าด้วยการจัดการแข่งขันกีฬาวิทยาศาสตร์สัมพันธ์แห่งประเทศไทย
                            </RuleItem>
                            <RuleItem>
                                ข้อบังคับและกติกาการแข่งขันบาสเกตบอลที่กำหนดใช้ในปัจจุบัน แต่ต้องไม่ขัดหรือแย้งกับระเบียบ
                            </RuleItem>
                        </Subsection>
                        <Subsection title="2. ประเภทการแข่งขัน">
                            <RuleItem>การแข่งขันประเภททีมผสม (ชายและหญิง)</RuleItem>
                        </Subsection>
                        <Subsection title="3. คุณสมบัติของผู้เข้าแข่งขัน">
                            <RuleItem>
                                เป็นนิสิต/นักศึกษาระดับปริญญาตรี อาจารย์ และบุคลากรสังกัดคณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพาเท่านั้น
                            </RuleItem>
                        </Subsection>
                        <Subsection title="4. จำนวนผู้เข้าแข่งขัน">
                            <RuleItem>
                                แต่ละคณะสีส่งทีมเข้าร่วมการแข่งขันได้ 1 ทีม และแต่ละทีมต้องมีผู้เล่นอย่างน้อย 5 คนขึ้นไป
                            </RuleItem>
                        </Subsection>
                        <Subsection title="5. วิธีการจัดการแข่งขัน">
                            <RuleItem>แข่งขันแบบพบกันหมดทุกคณะสี</RuleItem>
                            <RuleItem>ใช้เวลาแข่งขัน 2 ควอเตอร์ ควอเตอร์ละ 15 นาที</RuleItem>
                        </Subsection>
                        <Subsection title="6. กำหนดการแข่งขัน">
                            <RuleItem>สถานที่แข่งขัน: โรงพละ 2 มหาวิทยาลัยบูรพา</RuleItem>
                        </Subsection>
                        <Subsection title="7. ชุดการแข่งขัน">
                            <RuleItem>ชุดแข่งขันต้องเป็นเสื้อสีที่สื่อถึงสีที่นักกีฬาสังกัด</RuleItem>
                            <RuleItem>
                                เครื่องป้องกันและอุปกรณ์เสริมอื่น ๆ ขึ้นอยู่กับดุลยพินิจของคณะกรรมการจัดการแข่งขัน โดยความเห็นชอบของคณะอนุกรรมการกีฬาบาสเกตบอล
                            </RuleItem>
                            <RuleItem>อุปกรณ์การแข่งขันให้อยู่ในดุลยพินิจของคณะกรรมการการแข่งขัน</RuleItem>
                        </Subsection>
                        <Subsection title="8. ข้อปฏิบัติในการแข่งขัน">
                            <RuleItem>
                                ผู้เข้าแข่งขันทุกคนต้องยอมรับคำตัดสินของกรรมการและปฏิบัติตามคำสั่งอย่างเคร่งครัด
                            </RuleItem>
                            <RuleItem>
                                หากทีมใดไม่ลงแข่งขันหรือไม่พร้อมแข่งขันตามกำหนดเวลาโดยไม่มีเหตุผลอันสมควร ให้คณะกรรมการจัดการแข่งขันปรับแพ้ทันที
                            </RuleItem>
                            <RuleItem>
                                ผู้เข้าแข่งขันต้องประพฤติดีและปฏิบัติตามกติกาอย่างเคร่งครัด
                            </RuleItem>
                            <RuleItem>ผู้ที่ฝ่าฝืนหรือไม่ปฏิบัติตามกติกาจะถูกปรับแพ้ทันที</RuleItem>
                        </Subsection>
                        <Subsection title="9. กรรมการตัดสินและเจ้าหน้าที่">
                            <RuleItem>
                                การตัดสินให้อยู่ในดุลยพินิจของคณะกรรมการจัดการแข่งขัน โดยความเห็นชอบของคณะอนุกรรมการกีฬาบาสเกตบอล
                            </RuleItem>
                        </Subsection>
                        <Subsection title="10. การประท้วงและการอุทธรณ์">
                            <RuleItem>
                                การประท้วงผลการแข่งขัน คุณสมบัตินักกีฬา กรรมการตัดสิน และเจ้าหน้าที่ ให้อยู่ในดุลยพินิจของคณะกรรมการจัดการแข่งขัน โดยความเห็นชอบของคณะกรรมการฝ่ายเทคนิคการกีฬา และถือเป็นที่สิ้นสุด
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
