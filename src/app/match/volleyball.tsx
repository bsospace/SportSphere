/* eslint-disable @typescript-eslint/no-unused-vars*/
import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import Podium from '@/components/Podium';

export default function VolleyballContent() {
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
    const sortedTeams = [2, 1, 3].map((rank) =>
        podiumData.find((team) => team.rank === rank)
    );

    return (
        <div>
            <p className="text-center text-4xl font-semibold mb-4">วอลเลย์บอล</p>

            {/* Podium Section */}
            <Card className="mt-4">
                <CardContent>
                    <Section title="ผลการแข่งขัน">
                        {/* <Podium teams={sortedTeams} /> */}
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
