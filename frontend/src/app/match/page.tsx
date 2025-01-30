/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
// import BrucketDisplay from '@/components/RenderBracket';
import "reactflow/dist/style.css";
// import ReactFlow, { Background, MiniMap } from 'reactflow';
import { Home, Loader2 } from "lucide-react";
// import LabelNode from '@/app/admin/brucket-match/label-node';

import RovContent from "./rov";
import ValorantContent from "./valorant";
import FootballContent from "./football";
import BasketballContent from "./basketball";
import VolleyballContent from "./volleyball";
import ChairballContent from "./chairball";
import BadmintonMenContent from "./badminton-men";
import BadmintonWomenContent from "./badminton-women";
import BadmintonMixedContent from "./badminton-mixed";
import LocalContent from "./local";

export default function MatchPage() {
    const router = useRouter();

    // const nodeTypes = { brucket:BrucketDisplay, label: LabelNode };

    // const [nodes, setNodes] = useState([]);
    // const [edges, setEdges] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sportData] = useState("valorant");

    let slug = "valorant";
    // Get slug from query param
    if (typeof window !== "undefined"){
        const urlParams = new URLSearchParams(window.location.search)
        slug = urlParams.get('sport') || 'valorant';
    }

    const sport = [
        { name: "valorant", label: "Valorant", file: "valorant", slug: "valorant" },
        { name: "football", label: "ฟุตบอล", file: "football", slug: "football" },
        { name: "volleyball", label: "วอลเลย์บอล", file: "volleyball", slug: "volleyball" },
        { name: "basketball", label: "บาสเกตบอล", file: "basketball", slug: "basketball" },
        { name: "chairball", label: "แชร์บอล", file: "chairball", slug: "chairball" },
        { name: "badminton-men", label: "แบดมินตันคู่ชาย", file: "badminton-men", slug: 'badminton-men' },
        { name: "badminton-women", label: "แบดมินตันคู่หญิง", file: "badminton-women", slug: "badminton-women" },
        { name: "badminton-mixed", label: "แบดมินตันคู่ผสม", file: "badminton-mixed", slug: "badminton-mixed" },
        { name: "local", label: "กีฬาพื้นบ้าน", file: "local", slug: "local" },
        { name: "rov", label: "RoV", file: "rov", slug: 'rov' },
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
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return <div className='text-center text-red-500'>{error}</div>
    }

    return (
        <div
            className="md:p-6 p-2 min-h-screen bg-white"
            style={{
                backgroundImage: "url('/images/sport-banner.svg')",
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
                {/* <p className="text-blue-700">Informatics</p> Games 2024  */}
                <div className="flex justify-center items-center">
                    <Image src="/images/ifgames-logo.svg" width={150} height={100} alt="logo" />
                </div>
                Line Up
            </h1>

            {/* Tabs */}
            <Tabs className="w-full" defaultValue={slug}>
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
                                    <TabsTrigger className="rounded-full" key={item.name} value={item.name} onClick={() =>
                                        router.push(`/match?sport=${item.slug}`)
                                    }>
                                        {item.label}
                                    </TabsTrigger>
                                ))
                            )}
                        </TabsList>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center rounded-lg w-full lg:w-[90%] mx-auto">

                    {/* RoV */}
                    <TabsContent value="rov" className="w-full">
                        <RovContent />
                    </TabsContent>

                    {/* Valorant */}
                    <TabsContent value="valorant" className="w-full">
                        <ValorantContent />
                    </TabsContent>

                    {/* Football */}
                    <TabsContent value="football" className="w-full">
                        <FootballContent />
                    </TabsContent>

                    {/* Volleyball */}
                    <TabsContent value="volleyball" className="w-full">
                        <VolleyballContent />
                    </TabsContent>

                    {/* Basketball */}
                    <TabsContent value="basketball" className="w-full">
                        <BasketballContent />
                    </TabsContent>

                    {/* Chairball */}
                    <TabsContent value="chairball" className="w-full">
                        <ChairballContent />
                    </TabsContent>

                    {/* Badminton Men */}
                    <TabsContent value="badminton-men" className="w-full">
                        <BadmintonMenContent />
                    </TabsContent>

                    {/* Badminton Women */}
                    <TabsContent value="badminton-women" className="w-full">
                        <BadmintonWomenContent />
                    </TabsContent>

                    {/* Badminton Mixed */}
                    <TabsContent value="badminton-mixed" className="w-full">
                        <BadmintonMixedContent />
                    </TabsContent>

                    {/* Local */}
                    <TabsContent value="local" className="w-full">
                        <LocalContent />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
