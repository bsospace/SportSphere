/* eslint-disable @typescript-eslint/no-explicit-any */

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
import BrucketDisplay from '@/components/RenderBracket';
import "reactflow/dist/style.css";
import ReactFlow, { Background, MiniMap } from 'reactflow';
import { Home } from "lucide-react";
import LabelNode from '@/app/admin/brucket-match/label-node';

export default function MatchPage() {
    const router = useRouter();
    
    const nodeTypes = { brucket:BrucketDisplay, label: LabelNode };

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

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
                const response = await fetch(`/assets/data/${sportData}.json`)
                if (!response.ok) throw new Error(`Failed to load ${sportData}.json`)
                const data = await response.json()

                setNodes(data.nodes || [])
                setEdges(data.edges || [])
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
                <div className="flex justify-center">
                <div className="overflow-x-auto overflow-hidden rounded-full flex lg:justify-center lg:w-[90%]">
                    <Button 
                        variant="outline" 
                        className="me-2 rounded-full"
                        onClick={() => router.push("/")}
                    >
                        <Home size={24} />
                    </Button>
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
                        <p className="text-center sm:text-left">This is RoV</p>
                        <div className="w-full h-[500px]">
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                fitView
                                nodeTypes={nodeTypes}
                                proOptions={{ hideAttribution: true }}
                                panOnScroll={true}
                                nodesDraggable={false}
                                panOnDrag={true}
                            >
                                <MiniMap />
                                <Background />
                            </ReactFlow>
                        </div>
                    </TabsContent>

                    <TabsContent value="valorant" className="w-full items-center">
                        <p className="text-center sm:text-left">This is Valorant</p>
                        <div className="w-full h-[500px]">
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                fitView
                                nodeTypes={nodeTypes}
                                proOptions={{ hideAttribution: true }}
                                panOnScroll={true}
                                nodesDraggable={false}
                                panOnDrag={true}
                            >
                                <MiniMap />
                                <Background />
                            </ReactFlow>
                        </div>
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
