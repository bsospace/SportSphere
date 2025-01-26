import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import Podium from '@/components/Podium';

export default function BadmintonMenContent() {
    // Mock data
    const podiumData = [
        {
            team: "สีเขียว นาคา",
            rank: 1,
            title: "ชนะเลิศอันดับที่ 1",
            score: 150,
            color: 'bg-green-300',
        },
        {
            team: "สีแดง หงส์เพลิง",
            rank: 2,
            title: "รองชนะเลิศอันดับที่ 1",
            score: 100,
            color: 'bg-red-300',
        },
        {
            team: "สีเหลือง กิเลนทองคำ",
            rank: 3,
            title: "รองชนะเลิศอันดับที่ 2",
            score: 80,
            color: 'bg-yellow-300',
        },
        {
            team: "สีน้ำเงิน สุบรรณนที",
            rank: 4,
            title: "รองชนะเลิศอันดับที่ 3",
            score: 50,
            color: 'bg-blue-300',
        },
        {
            team: "สีชมพู เอราวัณ",
            rank: 5,
            title: "รองชนะเลิศอันดับที่ 4",
            score: 30,
            color: 'bg-pink-300',
        }
    ];

    const sortedTeams = [4, 2, 1, 3, 5].map((rank) =>
        podiumData.find((team) => team.rank === rank)
    );

    return (
        <div>
            <p className="text-center text-4xl font-semibold mb-4">แบดมินตันคู่ชาย</p>

            <Card className="mt-4">
                <CardContent>
                    <Section title="ผลการแข่งขัน">
                        Coming Soon...
                    </Section>
                </CardContent>
            </Card>

            <Card className='mt-4'>
                <CardContent>
                    <Section title="ตารางการแข่งขัน">
                        Coming Soon...
                    </Section>
                </CardContent>
            </Card>
            
            <Card className='mt-4'>
                <CardContent>
                    <Section title="กติกาการแข่งขันแบดมินตันคู่ชาย">
                        <Subsection title="1. ระเบียบและกติกาการแข่งขัน">
                            <RuleItem>
                                การแข่งขันเป็นประเภทคู่ชาย
                            </RuleItem>
                        </Subsection>
                        <Subsection title="2. จำนวนผู้เข้าแข่งขัน">
                            <RuleItem>
                                ลงเล่นได้ครั้งละ 2 คน
                            </RuleItem>
                            <RuleItem>
                                สามารถเปลี่ยนตัวผู้เล่นเข้าออกได้หลังจากจบ 1 เกม
                            </RuleItem>
                        </Subsection>
                        <Subsection title="3. วิธีการจัดการแข่งขัน">
                            <RuleItem>
                                แข่งขันแบบพบกันหมด
                            </RuleItem>
                            <RuleItem>
                                แข่งขัน 3 เกม 21 แต้มต่อเกม ทีมที่ชนะ 2 ใน 3 เกมถือเป็นผู้ชนะ
                            </RuleItem>
                            <RuleItem>
                                ยกเว้นเมื่อได้ 20 คะแนนเท่ากันต้องนับแต้มต่อให้มีคะแนนห่างกัน 2 คะแนน
                                ฝ่ายใดได้คะแนนนำ 2 คะแนนก่อนถือเป็นผู้ชนะ 
                            </RuleItem>
                            <RuleItem>
                                แต่ไม่เกิน 30 คะแนน หมายความว่า หากเล่นมาจนถึง 29 คะแนนเท่ากัน ฝ่ายใดได้ 30 คะแนนก่อนถือเป็นผู้ชนะ
                            </RuleItem>
                            <RuleItem>
                                ผู้ชนะเป็นฝ่ายเสิร์ฟลูกในเกมถัดไป
                            </RuleItem>
                        </Subsection>
                        <Subsection title="4. ชุดการแข่งขัน">
                            <RuleItem>
                                ชุดแข่งต้องแสดงสีของทีมชัดเจน
                            </RuleItem>
                            <RuleItem>
                                อุปกรณ์ทั้งหมดต้องเป็นไปตามมาตรฐานของสมาคมกีฬาแบดมินตัน
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
