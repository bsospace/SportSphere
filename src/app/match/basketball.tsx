/* eslint-disable @typescript-eslint/no-unused-vars*/
import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import Podium from '@/components/Podium';

export default function BasketballContent() {
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

    // Sorting teams in the podium layout order: 4, 2, 1, 3, 5
    const sortedTeams = [4, 2, 1, 3, 5].map((rank) =>
        podiumData.find((team) => team.rank === rank)
    );

    return (
        <div>
            <p className="text-center text-4xl font-semibold mb-4">บาสเกตบอล</p>

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
