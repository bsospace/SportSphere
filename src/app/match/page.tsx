/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TournamentBracket from "@/components/TournamentBracket";
import { tournamentData } from "@/mock/tournamentData";
// import BrucketDisplay from '@/components/RenderBracket';
import "reactflow/dist/style.css";
// import ReactFlow, { Background, MiniMap } from 'reactflow';
import { Home } from "lucide-react";
// import LabelNode from '@/app/admin/brucket-match/label-node';

export default function MatchPage() {
    const router = useRouter();
    
    // const nodeTypes = { brucket:BrucketDisplay, label: LabelNode };

    // const [nodes, setNodes] = useState([]);
    // const [edges, setEdges] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sportData, setSportData] = useState("rov");

    const sport = [
        { name: "rov", label: "RoV", file: "rov" },
        { name: "valorant", label: "Valorant", file: "valorant" },
        { name: "football", label: "ฟุตบอล (ผสม)", file: "football", disabled: true },
        { name: "futsal", label: "ฟุตซอล (ชาย)", file: "futsal", disabled: true },
        { name: "volleyball", label: "วอลเลย์บอล (ผสม)", file: "volleyball", disabled: true },
        { name: "basketball", label: "บาสเกตบอล (ผสม)", file: "basketball", disabled: true },
        { name: "chairball", label: "แชร์บอล (ผสม)", file: "chairball", disabled: true },
        { name: "badminton-men", label: "แบดมินตันเดี่ยวชาย", file: "badminton-men", disabled: true },
        { name: "badminton-women", label: "แบดมินตันเดี่ยวหญิง", file: "badminton-women", disabled: true },
        { name: "badminton-mixed", label: "แบดมินตันคู่ผสม", file: "badminton-mixed", disabled: true },
        { name: "local", label: "กีฬาพื้นบ้าน", file: "local", disabled: true },
    ]

    useEffect(() => {
        const fetchBracketData = async () => {
            try {
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchBracketData()
    }, [sportData])


    if (loading) {
        return <div className='text-center text-gray-500'>Loading...</div>
    }

    if (error) {
        return <div className='text-center text-red-500'>{error}</div>
    }

    return (
        <div
            className="md:p-6 p-2 min-h-screen bg-white"
            style={{
                backgroundImage: "url('/images/banner.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h1
                className="text-3xl sm:text-4xl font-extrabold mb-6 pt-6 md:p-0 text-center text-white"
                style={{
                    textShadow: "0 0 10px rgba(0,0,0,0.5)",
                    WebkitTextStroke: "1px black",
                }}
            >
                <p className="text-blue-700">Informatics</p> Games 2024 <br /> Line Up
            </h1>

            {/* Tabs */}
            <Tabs className="w-full" defaultValue="rov">
                <div className="flex lg:w-[90%] w-full lg:justify-center items-center mx-auto">
                <Button 
                    variant="outline" 
                    className="me-2 rounded-full"
                    onClick={() => router.push("/")}
                >
                    <Home size={24} />
                </Button>
                <div className="overflow-x-auto overflow-hidden rounded-full flex ">
                    <TabsList className="rounded-full">
                        {(
                            sport.map((item) => (
                                <TabsTrigger className="rounded-full" key={item.name} value={item.name} onClick={() => setSportData(item.name)} disabled={item.disabled}>
                                    {item.label}
                                </TabsTrigger>
                            ))
                        )}
                    </TabsList>
                </div>
                </div>

                <div className="mt-8 flex flex-col items-center bg-white shadow-md rounded-lg md:p-4 w-full lg:w-[90%] mx-auto">
                    <TabsContent value="rov" className="w-full">
                        <p className="text-center sm:text-left text-lg font-semibold mb-4">RoV</p>
                        
                        <Button onClick={() => router.push("/match/rov")}>See Full Match</Button>
                        <div className="mt-4">
        <h2 className="text-xl font-bold">กติกาการแข่งขันทั่วไป</h2>

        <h3>1. รูปแบบการแข่งขัน</h3>
        <ul>
            <li>การแข่งขันในทุกรอบจะต้องสร้างห้องแข่งขันในโหมด <strong>“การแข่งขัน 5v5”</strong> เท่านั้น</li>
            <li>ไม่อนุญาตให้ใช้โหมดอื่น เช่น โหมดจัดอันดับ หรือโหมดสร้างห้องแบบปกติ เพื่อให้การแข่งขันเป็นมาตรฐานเดียวกัน</li>
        </ul>

        <h3>2. การแบ่งรอบการแข่งขัน</h3>
        <ul>
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

        <h3>3. การใช้สกินในเกม</h3>
        <ul>
            <li>ผู้เข้าแข่งขันสามารถเลือกใช้สกินได้ทุกประเภท ยกเว้นมีประกาศเพิ่มเติมจากสโมสร</li>
            <li>หากมีการห้ามใช้สกินบางประเภท จะมีการแจ้งล่วงหน้าก่อนการแข่งขัน</li>
        </ul>

        <h3>4. เซิร์ฟเวอร์และแพตช์เกมที่ใช้ในการแข่งขัน</h3>
        <ul>
            <li>การแข่งขันทั้งหมดจะใช้เซิร์ฟเวอร์และแพตช์เกมเวอร์ชันปัจจุบัน เพื่อให้มั่นใจว่าผู้เข้าแข่งขันทุกคนใช้เงื่อนไขเดียวกัน</li>
        </ul>

        <hr />

        <h2>กฎกติกาการแข่งขันรอบเก็บคะแนน (Online)</h2>

        <h3>1. รูปแบบการแข่งขันในรอบเก็บคะแนน</h3>
        <ul>
            <li>การแข่งขันในรอบนี้แบ่งออกเป็น <strong>3 วัน</strong> โดยในแต่ละวันจะแข่งขัน <strong>2 เกม</strong></li>
            <li>ทีมที่ทำคะแนนรวมได้สูงสุด <strong>8 ทีมแรก</strong> จะผ่านเข้าสู่รอบน็อคเอาท์</li>
        </ul>

        <h3>2. การนับคะแนนการแข่งขัน</h3>
        <ul>
            <li>คะแนนในแต่ละแมตช์จะถูกนับดังนี้:
                <ul>
                    <li><strong>เสมอ (1:1):</strong> ทั้งสองทีมจะได้รับทีมละ <strong>1 คะแนน</strong></li>
                    <li><strong>ชนะ (2:0):</strong> ทีมที่ชนะจะได้ <strong>3 คะแนน</strong> ส่วนทีมแพ้จะไม่ได้คะแนน</li>
                </ul>
            </li>
        </ul>

        <hr />

        <h2>กฎกติกาการแข่งขันรอบน็อคเอาท์ (8 ทีมสุดท้าย)</h2>

        <h3>1. รูปแบบการแข่งขัน</h3>
        <ul>
            <li>การแข่งขันในรอบน็อคเอาท์จะใช้ระบบ <strong>ชนะ 2 ใน 3 เกม (Best of 3)</strong></li>
            <li>ทีมที่ชนะ 2 เกมก่อนจะเป็นฝ่ายชนะในรอบนั้นทันที</li>
            <li>ใช้ระบบ <strong>Global Ban Pick</strong> เพื่อเพิ่มความยุติธรรมและกลยุทธ์ในการแข่งขัน</li>
        </ul>

        <h3>2. ข้อกำหนดเกี่ยวกับเวลาเริ่มเกม</h3>
        <ul>
            <li>หากทีมใดมาถึงห้องแข่งขันช้ากว่าเวลาที่กำหนดเกิน <strong>15 นาที</strong> จะถูกปรับแพ้ทันที</li>
        </ul>

        <h3>3. ข้อห้ามเกี่ยวกับฮีโร่ Xeniel</h3>
        <ul>
            <li>ห้ามใช้ฮีโร่ <strong>Xeniel</strong> ในทุกเกมของรอบนี้</li>
            <li>หากมีการใช้ Xeniel จะถูกลงโทษดังนี้:
                <ul>
                    <li>เกมนั้นจะถือว่าแพ้ทันที</li>
                    <li>หากยังมีเกมที่เหลือ ต้องเริ่มเกมใหม่โดย Xeniel จะถูกแบนออกจากการเลือก</li>
                </ul>
            </li>
        </ul>

        <h3>4. การหลุดออกจากเกมและการเริ่มเกมใหม่</h3>
        <ul>
            <li>หากผู้เล่นหลุดจากเกมเนื่องจากปัญหาทางเทคนิค ผู้เข้าแข่งขันสามารถกดหยุดเกมได้ทีมละ <strong>3 ครั้ง ครั้งละไม่เกิน 1 นาที</strong></li>
            <li>การขอเริ่มเกมใหม่สามารถทำได้ในกรณีดังนี้:
                <ul>
                    <li>ยังไม่มี First Blood เกิดขึ้น</li>
                    <li>เวลาที่เล่นยังไม่เกิน 2 นาที</li>
                </ul>
            </li>
            <li>หากไม่เข้าข่ายเงื่อนไขข้างต้น จะต้องได้รับการยินยอมจากทีมตรงข้าม</li>
        </ul>
    </div>
                    </TabsContent>

                    <TabsContent value="valorant" className="w-full items-center">
                    <p className="text-center sm:text-left text-lg font-semibold mb-4">Valorant</p>
                    <Button onClick={() => router.push("/match/valorant")}>See Full Match</Button>
                    </TabsContent>

                    <TabsContent value="football">
                        <p className="text-center sm:text-left">This is ฟุตบอล (ผสม)</p>
                    </TabsContent>

                    <TabsContent value="futsal">
                        <p className="text-center sm:text-left">This is ฟุตซอล (ชาย)</p>
                    </TabsContent>

                    <TabsContent value="volleyball">
                        <p className="text-center sm:text-left">This is วอลเลย์บอล (ผสม)</p>
                    </TabsContent>

                    <TabsContent value="basketball">
                        <p className="text-center sm:text-left">This is บาสเกตบอล (ผสม)</p>
                    </TabsContent>

                    <TabsContent value="chairball">
                        <p className="text-center sm:text-left">This is แชร์บอล (ผสม)</p>
                    </TabsContent>

                    <TabsContent value="badminton-men">
                        <p className="text-center sm:text-left">This is แบดมินตันเดี่ยวชาย</p>
                    </TabsContent>

                    <TabsContent value="badminton-women">
                        <p className="text-center sm:text-left">This is แบดมินตันเดี่ยวหญิง</p>
                    </TabsContent>

                    <TabsContent value="badminton-mixed">
                        <p className="text-center sm:text-left">This is แบดมินตันคู่ผสม</p>
                    </TabsContent>

                    <TabsContent value="local">
                        <p className="text-center sm:text-left">This is กีฬาพื้นบ้าน</p>
                    </TabsContent>

                    <TabsContent value="dev">
                        <TournamentBracket rounds={tournamentData} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
