import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import Podium from '@/components/Podium';

export default function ChairballContent() {
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
            <p className="text-center text-4xl font-semibold mb-4">แชร์บอล</p>

            <Card className="mt-4">
                <CardContent>
                    <Section title="ผลการแข่งขัน">
                        Coming Soon...
                    </Section>
                </CardContent>
            </Card>

            <Card className="mt-4">
                <CardContent>
                    <Section title="ตารางการแข่งขัน">
                        Coming Soon...
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
