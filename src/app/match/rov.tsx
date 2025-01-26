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
        team: "สยองกึ๋ม",
        rank: 1,
        title: "ชนะเลิศอันดับที่ 1",
    },
    {
        team: "โดดเรียนมาตีป้อม",
        rank: 2,
        title: "รองชนะเลิศอันดับที่ 1",
    },
    {
        team: "SE สยองกึ้ม",
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
                <>
                    <li key={index}>
                        {match.title}
                        <br />
                        {match.result}
                        {match.videos && (
                            <ul className='list-disc ml-4'>
                                {match.videos.map((video, idx) => (
                                    <>
                                        <li key={idx}>
                                            {video.label}
                                            <br />
                                            <div className="aspect-video w-full lg:w-1/2">
                                                <iframe
                                                    className="w-full h-full"
                                                    src={video.url}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </li>
                                    </>
                                ))}
                            </ul>
                        )}
                    </li>
                    <br />
                </>
            ))}
        </ul>
    </div>
);

export default function RovContent() {
    const router = useRouter();

    const matchResults = [
        {
            roundTitle: 'รอบ 8 ทีมสุดท้าย',
            matches: [
                {
                    title: 'คู่ที่ 1 "เด็กเกษครมารัน" VS "SE สยองกึ้ม"',
                    result: 'SE สยองกึ้ม ชนะบาย',
                },
                {
                    title: 'คู่ที่ 2 "สยองกึ๋ม" VS "The nut พเนจร"',
                    result: '',
                    videos: [
                        {
                            label: '',
                            url: 'https://www.youtube.com/embed/lPp8GPfFhYw',
                            title: 'IF-GAME ROV รอบ 8 ทีมสุดท้าย (คู่ที่ 2)',
                        },
                    ],
                },
                {
                    title: 'คู่ที่ 3 "สีหักลายกนก" VS "SE ชินจังชอบกินบล็อคโคลี่"',
                    result: 'ชินจังชอบกินบล็อคโคลี่ ชนะบาย',
                },
                {
                    title: 'คู่ที่ 4 "บุ้งกี๋แบรนด์" VS "SE โดดเรียนมาตีป้อม"',
                    result: '',
                    videos: [
                        {
                            label: 'ครึ่งแรก',
                            url: 'https://www.youtube.com/embed/XB3-y4WHr2E',
                            title: 'IF-GAME ROV รอบ 8 ทีมสุดท้าย (คู่ที่ 4) ครึ่งแรก',
                        },
                        {
                            label: 'ครึ่งหลัง',
                            url: 'https://www.youtube.com/embed/_gmmKVzRZbg',
                            title: 'IF-GAME ROV รอบ 8 ทีมสุดท้าย (คู่ที่ 4) ครึ่งหลัง',
                        },
                    ],
                },
            ],
        },
        {
            roundTitle: 'รอบ 4 ทีมสุดท้าย',
            matches: [
                {
                    title: 'รอบ Semi Finals',
                    result: '',
                    videos: [
                        {
                            label: '',
                            url: 'https://www.youtube.com/embed/GJEgpQXq6XM',
                        },
                    ],
                },
            ],
        },
        {
            roundTitle: 'รอบชิงชนะเลิศ',
            matches: [
                {
                    title: 'รอบ Grand Finals',
                    result: '',
                    videos: [
                        {
                            label: '',
                            url: 'https://www.youtube.com/embed/lDenWNUPqqA',
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div>
            <p className="text-center text-4xl font-semibold mb-4">RoV</p>

            <Card>
                <CardContent>
                    <Section title="ผลการแข่งขัน">
                        <Podium teams={sortedTeams} />
                    </Section>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.push("/match/rov")}>ดูผลการแข่งขัน RoV แบบละเอียด</Button>
                </CardFooter>
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
                    <h2 className='text-2xl font-semibold mt-4 mb-2'>กติกาการแข่งขันทั่วไป</h2>

                    <h1 className='text-xl font-semibold mt-4 mb-2'>1. รูปแบบการแข่งขัน</h1>
                    <ul className='list-disc ml-4'>
                        <li>การแข่งขันในทุกรอบจะต้องสร้างห้องแข่งขันในโหมด <strong>“การแข่งขัน 5v5”</strong> เท่านั้น</li>
                        <li>ไม่อนุญาตให้ใช้โหมดอื่น เช่น โหมดจัดอันดับ หรือโหมดสร้างห้องแบบปกติ เพื่อให้การแข่งขันเป็นมาตรฐานเดียวกัน</li>
                    </ul>

                    <h3 className='text-xl font-semibold mt-4 mb-2'>2. การแบ่งรอบการแข่งขัน</h3>
                    <ul className='list-disc ml-4'>
                        <li>การแข่งขันแบ่งออกเป็น 4 รอบ:
                            <ul>
                                <li>รอบเก็บคะแนนแบบทีม (Online)</li>
                                <li>รอบน็อคเอาท์ 8 ทีมสุดท้าย (Offline)</li>
                                <li>รอบ 4 ทีมสุดท้าย (Offline)</li>
                                <li>รอบชิงชนะเลิศ (Offline)</li>
                            </ul>
                        </li>
                        <li>ในรอบ Offline ผู้เข้าแข่งขันทุกคนต้องมารายงานตัวก่อนเวลาที่กำหนดอย่างน้อย <strong>30 นาที</strong></li>
                    </ul>

                    <h3 className='text-xl font-semibold mt-4 mb-2'>3. การใช้สกินในเกม</h3>
                    <ul className='list-disc ml-4'>
                        <li>ผู้เข้าแข่งขันสามารถเลือกใช้สกินได้ทุกประเภท ยกเว้นมีประกาศเพิ่มเติมจากสโมสร</li>
                        <li>หากมีการห้ามใช้สกินบางประเภท จะมีการแจ้งล่วงหน้าก่อนการแข่งขัน</li>
                    </ul>

                    <h3 className='text-xl font-semibold mt-4 mb-2'>4. เซิร์ฟเวอร์และแพตช์เกมที่ใช้ในการแข่งขัน</h3>
                    <ul>
                        <li>การแข่งขันทั้งหมดจะใช้เซิร์ฟเวอร์และแพตช์เกมเวอร์ชันปัจจุบัน เพื่อให้มั่นใจว่าผู้เข้าแข่งขันทุกคนใช้เงื่อนไขเดียวกัน</li>
                    </ul>

                    <hr />

                    <h2 className='text-2xl font-semibold mt-4 mb-2'>กฎกติกาการแข่งขันรอบเก็บคะแนน (Online)</h2>

                    <h3 className='text-xl font-semibold mt-4 mb-2'>1. รูปแบบการแข่งขันในรอบเก็บคะแนน</h3>
                    <ul className='list-disc ml-4'>
                        <li>การแข่งขันในรอบนี้แบ่งออกเป็น <strong>3 วัน</strong> โดยในแต่ละวันจะแข่งขัน <strong>2 เกม</strong></li>
                        <li>ทีมที่ทำคะแนนรวมได้สูงสุด <strong>8 ทีมแรก</strong> จะผ่านเข้าสู่รอบน็อคเอาท์</li>
                    </ul>

                    <h3 className='text-xl font-semibold mt-4 mb-2'>2. การนับคะแนนการแข่งขัน</h3>
                    <ul className='list-disc ml-4'>
                        <li>คะแนนในแต่ละแมตช์จะถูกนับดังนี้:
                            <ul>
                                <li><strong>เสมอ (1:1):</strong> ทั้งสองทีมจะได้รับทีมละ <strong>1 คะแนน</strong></li>
                                <li><strong>ชนะ (2:0):</strong> ทีมที่ชนะจะได้ <strong>3 คะแนน</strong> ส่วนทีมแพ้จะไม่ได้คะแนน</li>
                            </ul>
                        </li>
                    </ul>

                    <hr />

                    <h2 className='text-2xl font-semibold mt-4 mb-2'>กฎกติกาการแข่งขันรอบน็อคเอาท์ (8 ทีมสุดท้าย)</h2>

                    <h3 className='text-xl font-semibold mt-4 mb-2'>1. รูปแบบการแข่งขัน</h3>
                    <ul className='list-disc ml-4'>
                        <li>การแข่งขันในรอบน็อคเอาท์จะใช้ระบบ <strong>ชนะ 2 ใน 3 เกม (Best of 3)</strong></li>
                        <li>ทีมที่ชนะ 2 เกมก่อนจะเป็นฝ่ายชนะในรอบนั้นทันที</li>
                        <li>ใช้ระบบ <strong>Global Ban Pick</strong> เพื่อเพิ่มความยุติธรรมและกลยุทธ์ในการแข่งขัน</li>
                    </ul>

                    <h3 className='text-xl font-semibold mt-4 mb-2'>2. ข้อกำหนดเกี่ยวกับเวลาเริ่มเกม</h3>
                    <ul className='list-disc ml-4'>
                        <li>หากทีมใดมาถึงห้องแข่งขันช้ากว่าเวลาที่กำหนดเกิน <strong>15 นาที</strong> จะถูกปรับแพ้ทันที</li>
                    </ul>

                    <h3 className='text-xl font-semibold mt-4 mb-2'>3. ข้อห้ามเกี่ยวกับฮีโร่ Xeniel</h3>
                    <ul className='list-disc ml-4'>
                        <li>ห้ามใช้ฮีโร่ <strong>Xeniel</strong> ในทุกเกมของรอบนี้</li>
                        <li>หากมีการใช้ Xeniel จะถูกลงโทษดังนี้:
                            <ul>
                                <li>เกมนั้นจะถือว่าแพ้ทันที</li>
                                <li>หากยังมีเกมที่เหลือ ต้องเริ่มเกมใหม่โดย Xeniel จะถูกแบนออกจากการเลือก</li>
                            </ul>
                        </li>
                    </ul>

                    <h3 className='text-xl font-semibold mt-4 mb-2'>4. การหลุดออกจากเกมและการเริ่มเกมใหม่</h3>
                    <ul className='list-disc ml-4'>
                        <li>หากผู้เล่นหลุดจากเกมเนื่องจากปัญหาทางเทคนิค ผู้เข้าแข่งขันสามารถกดหยุดเกมได้ทีมละ <strong>3 ครั้ง ครั้งละไม่เกิน 1 นาที</strong></li>
                        <li>การขอเริ่มเกมใหม่สามารถทำได้ในกรณีดังนี้:
                            <ul>
                                <li>ยังไม่มี First Blood เกิดขึ้น</li>
                                <li>เวลาที่เล่นยังไม่เกิน 2 นาที</li>
                            </ul>
                        </li>
                        <li>หากไม่เข้าข่ายเงื่อนไขข้างต้น จะต้องได้รับการยินยอมจากทีมตรงข้าม</li>
                    </ul>
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