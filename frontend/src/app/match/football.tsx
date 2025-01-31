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

export default function FootballContent() {
    const [podiumData, setPodiumData] = useState<{ team: string; rank: number; title: string; score: number; color: string; }[]>([]);
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { socket, connected } = useSocket();

    const fetchData = async () => {
        try {
            const response = await api.get('api/v1/match/FB');
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
                    if(message.data.sport === 'FB'){
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
            <p className="text-center text-4xl font-semibold mb-4">ฟุตบอล</p>
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
                    <Section title="กติกาการแข่งขันฟุตบอล">
                        <Subsection title="1. ระเบียบและกติกาการแข่งขัน">
                            <RuleItem>
                                ใช้กติกาการแข่งขันของสหพันธ์ฟุตบอลนานาชาติ (FIFA) ซึ่งสมาคมกีฬาฟุตบอลแห่งประเทศไทยประกาศใช้อย่างเป็นทางการในปัจจุบัน แต่ไม่มีการล้ำหน้า
                            </RuleItem>
                            <RuleItem>
                                แข่งขันฟุตบอล 9 คน รวมผู้รักษาประตู 1 คน
                            </RuleItem>
                            <RuleItem>
                                สามารถเปลี่ยนตัวผู้เล่นเข้าออกกี่รอบก็ได้
                            </RuleItem>
                        </Subsection>
                        <Subsection title="2. ประเภทการแข่งขัน">
                            <RuleItem>การแข่งขันประเภททีมผสม</RuleItem>
                        </Subsection>
                        <Subsection title="3. คุณสมบัติของผู้เข้าแข่งขัน">
                            <RuleItem>
                                เป็นนักศึกษาระดับปริญญาตรี ศิษย์เก่า และบุคลากรสังกัดคณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพาเท่านั้น
                            </RuleItem>
                        </Subsection>
                        <Subsection title="4. จำนวนผู้เข้าแข่งขัน">
                            <RuleItem>
                                แต่ละสีส่งทีมได้ไม่เกิน 1 ทีม และสามารถส่งรายชื่อผู้เล่นได้ทั้งหมด 17 คน
                            </RuleItem>
                            <RuleItem>
                                อนุญาตให้มีผู้จัดการทีม/ผู้ฝึกสอน 1 คน เจ้าหน้าที่ทีม 2 คน ผู้เล่นจริงและสำรองรวม 17 คน ห้ามบุคคลอื่นลงสนามหรืออยู่ข้างสนาม
                            </RuleItem>
                        </Subsection>
                        <Subsection title="5. วิธีการจัดการแข่งขัน">
                            <RuleItem>แข่งขันแบบเจอกันทุกสี</RuleItem>
                            <RuleItem>ใช้เวลาแข่งขัน 2 ครึ่ง ครึ่งละ 20 นาที</RuleItem>
                            <RuleItem>หากเสมอ จะเตะจุดโทษเพื่อหาผู้ชนะ</RuleItem>
                            <RuleItem>
                                หยุดเวลาทุกครั้งที่มีการทำฟาวล์ และกรณีอื่น ๆ ขึ้นอยู่กับดุลยพินิจของกรรมการ
                            </RuleItem>
                        </Subsection>
                        <Subsection title="6. กำหนดการแข่งขัน">
                            <RuleItem>
                                สถานที่แข่งขัน: สนามกีฬากลาง เชาวน์ มณีวงษ์
                            </RuleItem>
                        </Subsection>
                        <Subsection title="7. ชุดการแข่งขันและอุปกรณ์">
                            <RuleItem>
                                ชุดการแข่งขันมีหมายเลขประจำตัว 1-99 ติดที่เสื้อด้านหลัง หรือเสื้อสีที่สื่อถึงสีของนักกีฬา
                            </RuleItem>
                            <RuleItem>ผู้เล่นควรใช้เครื่องป้องกันหน้าแข้ง</RuleItem>
                            <RuleItem>
                                อุปกรณ์การแข่งขันให้อยู่ในดุลยพินิจของคณะกรรมการการแข่งขัน
                            </RuleItem>
                        </Subsection>
                        <Subsection title="8. ข้อปฏิบัติในการแข่งขัน">
                            <RuleItem>
                                ผู้เข้าแข่งขันต้องยอมรับคำตัดสินของกรรมการและปฏิบัติตามกติกาอย่างเคร่งครัด
                            </RuleItem>
                            <RuleItem>
                                ส่งรายชื่อผู้เล่นให้ตรงกับหมายเลขที่ลงทะเบียนไว้ไม่น้อยกว่า 30 นาทีก่อนเริ่มแข่งขัน
                            </RuleItem>
                            <RuleItem>ผู้ใดฝ่าฝืนกติกาจะถูกปรับแพ้ทันที</RuleItem>
                        </Subsection>
                        <Subsection title="9. กรรมการตัดสินและเจ้าหน้าที่">
                            <RuleItem>
                                การตัดสินให้อยู่ในดุลยพินิจของคณะกรรมการจัดการแข่งขัน
                            </RuleItem>
                        </Subsection>
                        <Subsection title="10. การทำฟาวล์">
                            <RuleItem>ใบเหลือง 2 ใบ (สะสม): แบน 1 นัด</RuleItem>
                            <RuleItem>ใบเหลือง 2 ใบ (ในเกมเดียว): แบน 2 นัด</RuleItem>
                            <RuleItem>ใบแดง: แบน 3 นัด</RuleItem>
                            <RuleItem>
                                ขึ้นอยู่กับดุลยพินิจของคณะกรรมการการแข่งขัน
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
