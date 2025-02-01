/* eslint-disable @typescript-eslint/no-unused-vars*/
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import Podium from '@/components/Podium';

const podiumData = [
    {
        team: "UNITE",
        rank: 1,
        title: "ชนะเลิศอันดับที่ 1",
    },
    {
        team: "PATIKOON",
        rank: 2,
        title: "รองชนะเลิศอันดับที่ 1",
    },
    {
        team: "หนมน้า หนมน้า",
        rank: 3,
        title: "รองชนะเลิศอันดับที่ 2",
    },
];

const sortedTeams = [2, 1, 3].map((rank) =>
    podiumData.find((team) => team.rank === rank)
);

const MatchResult = ({ roundTitle, matches }) => (
    <div>
        <h2 className='text-xl font-semibold mt-4 mb-2'>{roundTitle}</h2>
        <ul className='list-disc ml-4'>
            {matches.map((match, index) => (
                <li key={index}>
                    {match.title}
                    <br />
                    {match.result}
                    {match.videos && (
                        <ul className='list-disc ml-4'>
                            {match.videos.map((video, idx) => (
                                <li key={idx}>
                                    {video.label}
                                    <br />
                                    <iframe
                                        className='aspect-video w-full md:w-fit md:h-[500px]'
                                        src={video.url}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    </div>
);

export default function ValorantContent() {
    const router = useRouter();

    const matchResults = [
        {
            roundTitle: 'รอบ 4 ทีมสุดท้าย',
            matches: [
                {
                    title: 'คู่ที่ 1 "UNITE" vs "หนมน้า หนมน้า" ',
                    result: '',
                    videos: [
                        {
                            label: '',
                            url: 'https://www.youtube.com/embed/D_VVjTnjM84'
                        }
                    ]
                },
                {
                    title: 'คู่ที่ 2 "PATIKOON" vs "เด็กซุ้มเฮียเจมส์" ',
                    result: '',
                    videos: [
                        {
                            label: '',
                            url: 'https://www.youtube.com/embed/Sz7Hb19-IHw'
                        }
                    ]
                },
            ]
        },
        {
            roundTitle: 'รอบชิงชนะเลิศ',
            matches: [
                {
                    title: '"UNITE" vs "PATIKOON"',
                    result: '',
                    videos: [
                        {
                            label: '',
                            url: 'https://www.youtube.com/embed/bIqkKE_-zOM'
                        }
                    ]
                },
            ]
        },
    ];

    return (
        <div>
            <p className="text-center text-4xl font-semibold mb-4">Valorant</p>
            <Card>
                <CardContent>
                    <Section title="ผลการแข่งขัน">
                        <Podium teams={sortedTeams} isLoading={false} />
                        <Button onClick={() => router.push("/match/valorant")}>ดูผลการแข่งขัน Valorant แบบละเอียด</Button>
                    </Section>
                </CardContent>
            </Card>

            <Card className='mt-4'>
                <CardContent>
                    <Section title="วิดีโอการแข่งขัน">
                        {matchResults.map((result, index) => (
                            <MatchResult key={index} roundTitle={result.roundTitle} matches={result.matches} />
                        ))}
                    </Section>
                </CardContent>
            </Card>

            <Card className='mt-4'>
                <CardContent>
                    <Section title="กติกาการแข่งขัน VALORANT">
                        <Subsection title="1. กฎรายชื่อผู้เล่น">
                            <RuleItem>
                                แต่ละทีมจะต้องมีผู้เล่น 5 คน (ผู้เล่นตั้งต้น) ที่อยู่ในรายชื่อผู้เล่นตัวจริงของทีม และมีอีกหนึ่งรายชื่อสำหรับตัวสำรอง
                            </RuleItem>
                            <RuleItem>
                                ทีมจะต้องคงจำนวนผู้เล่นไว้อย่างน้อย 5 คน (จำนวนผู้เล่นขั้นต่ำ) และไม่เกิน 6 คน (จำนวนผู้เล่นสูงสุด)
                            </RuleItem>
                        </Subsection>
                        <Subsection title="2. การเปลี่ยนตัวผู้เล่น">
                            <RuleItem>
                                การเปลี่ยนตัวใด ๆ จะต้องมาจากทีมที่มีรายชื่อผู้เล่นที่มีสิทธิ์หรือรายชื่อผู้เล่นตั้งต้น
                            </RuleItem>
                            <RuleItem>
                                สำหรับแมตช์ที่มีแผนที่มากกว่าหนึ่งแผนที่ (เช่น แมตช์สองในสามหรือสามในห้า) ทีมสามารถแทนที่ผู้เล่นตั้งต้นปัจจุบันด้วยผู้เล่นสำรองในระหว่างแผนที่ โดยมีเงื่อนไขว่าทีมจะต้องแจ้งให้กรรมการทราบและได้รับการอนุมัติจากกรรมการภายในสองนาทีหลังจากจบเกมล่าสุด
                            </RuleItem>
                            <RuleItem>
                                หากผู้เล่นขาดการเชื่อมต่อระหว่างแผนที่และไม่สามารถกลับมาได้ภายใน 2 นาที เกมจะดำเนินการต่อโดยไม่อนุญาตให้ฝ่ายที่หลุดทำการยอมแพ้ใด ๆ
                            </RuleItem>
                            <RuleItem>
                                หากผู้เล่นขาดการเชื่อมต่อในช่วง 0:0 กรรมการจะหยุดเกมเป็นเวลา 2 นาที และหากผู้เล่นตัวจริงไม่สามารถกลับมาได้ จะสร้างล็อบบี้ใหม่และอนุญาตให้ผู้เล่นสำรองเข้ามาแทน
                            </RuleItem>
                        </Subsection>
                        <Subsection title="3. โค้ช">
                            <RuleItem>
                                โค้ชหรือบุคลากรทีมสามารถสื่อสารกับผู้เล่นในช่วงการเลือกเอเจนท์และแผนที่, เวลานอก, ช่วงพักครึ่ง, การต่อเวลา และระหว่างแผนที่ ห้ามสื่อสารระหว่างแมตช์เว้นแต่ได้รับอนุญาตจากกรรมการ
                            </RuleItem>
                        </Subsection>
                        <Subsection title="4. ความตรงต่อเวลา">
                            <RuleItem>
                                ผู้เล่นและโค้ชต้องพร้อมในล็อบบี้ภายใน 15 นาทีหลังเวลาเริ่ม
                            </RuleItem>
                            <RuleItem>
                                หากมีเหตุสุดวิสัย ทีมต้องแจ้งทันที กรรมการอาจเลื่อน พัก หรือยกเลิกแมตช์ตามดุลยพินิจ
                            </RuleItem>
                            <RuleItem>
                                การเลื่อนการแข่งขันจำกัดเวลาไม่เกิน 1 ชั่วโมง
                            </RuleItem>
                        </Subsection>
                        <Subsection title="5. ข้อจำกัดในการตั้งค่าล็อบบี้และการเล่นเกม">
                            <RuleItem >
                                Server: Singapore<br />
                                Allow Cheats: Off<br />
                                Tournament Mode: On<br />
                                Overtime: Win by Two: On<br />
                                Play out all Rounds: Off<br />
                                Hide Match History: Off
                            </RuleItem>
                            <RuleItem>
                                ทีมเลือกคนละ 3 แผนที่จาก: Ascent, Haven, Abyss, Pearl, Bind, Sunset
                                <li>หากเลือกเหมือนกัน 3 แผนที่จะเล่น 3 แผนที่นี้</li>
                                <li>หากเลือกเหมือนกัน 2 แผนที่จะสุ่ม 1 แผนที่ที่เหลือ</li>
                                <li>หากเลือกเหมือนกัน 1 แผนที่จะสุ่ม 2 แผนที่ที่เหลือ</li>
                                <li>หากเลือกต่างกันทั้งหมดจะสุ่ม 3 แผนที่จากทั้งหมด</li>
                                <li>หลังจากได้แผนที่ทั้ง 3 แล้วกรรมการจะเป็นผู้สุ่มลำดับการเล่นของแต่ละแผนที่</li>
                                <li>ห้ามใช้ agent ชื่อว่า <strong className='text-red-500'>Tejo </strong>
                                    หากมีการใช้ Tejo จะถูกลงโทษ
                                    เกมนั้นจะถือว่าแพ้ทันที
                                </li>
                            </RuleItem>
                        </Subsection>
                        <Subsection title="6. Pause (การหยุดเกมชั่วคราว)">
                            <RuleItem>
                                ทีมสามารถขอเวลานอก 60 วินาทีได้ครั้งละ 1 ครั้งต่อครึ่งเกม
                            </RuleItem>
                            <RuleItem>
                                การขอเวลานอกต้องอยู่ใน 20 วินาทีแรกของช่วงซื้อ มิฉะนั้นจะเลื่อนไปใช้ในรอบถัดไป
                            </RuleItem>
                        </Subsection>
                        <Subsection title="7. การโกงการแข่งขัน">
                            <RuleItem>
                                การโกงรวมถึงการเล่นแทน การใช้โปรแกรมช่วยเล่น การใช้บั๊กเพื่อได้เปรียบ และการทำให้ซอฟต์แวร์หรือฮาร์ดแวร์เสียหาย
                            </RuleItem>
                        </Subsection>
                        <Subsection title="8. การสื่อสารในแมตช์">
                            <RuleItem>
                                <li>การสื่อสารเสียงหรือแชทในทีมเดียวกัน</li>
                                <li>โค้ชสามารถสื่อสารในช่วงเลือกเอเจนท์, เวลานอก, พักครึ่ง, และเปลี่ยนแผนที่</li>
                            </RuleItem>
                            <RuleItem>
                                <li>การสื่อสารกับบุคคลภายนอก</li>
                                <li>โค้ชสื่อสารนอกเหนือช่วงที่กำหนด</li>
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
