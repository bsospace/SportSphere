import React from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import TournamentBracket from "@/components/TournamentBracket";
import { tournamentData } from "@/mock/tournamentData";

export default function MatchPage() {
    return (
        <div
            className="p-6 sm:p-12 min-h-screen bg-white"
            style={{
                backgroundImage: "url('/images/banner.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h1
                className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-white"
                style={{
                    textShadow: "0 0 10px rgba(0,0,0,0.5)",
                    WebkitTextStroke: "1px black",
                }}
            >
                <p className="text-blue-700">Informatics</p> Games 2024 <br /> Line Up
            </h1>

            {/* Tabs */}
            <Tabs className="w-full" defaultValue="rov">
                <div className="overflow-x-auto rounded-lg justify-center flex">
                    <TabsList>
                        <TabsTrigger value="rov">RoV</TabsTrigger>
                        <TabsTrigger value="valorant">Valorant</TabsTrigger>
                        <TabsTrigger value="football" disabled>
                            ฟุตบอล (ผสม)
                        </TabsTrigger>
                        <TabsTrigger value="futsal" disabled>
                            ฟุตซอล (ชาย)
                        </TabsTrigger>
                        <TabsTrigger value="volleyball" disabled>
                            วอลเลย์บอล (ผสม)
                        </TabsTrigger>
                        <TabsTrigger value="basketball" disabled>
                            บาสเกตบอล (ผสม)
                        </TabsTrigger>
                        <TabsTrigger value="chairball" disabled>
                            แชร์บอล (ผสม)
                        </TabsTrigger>
                        <TabsTrigger value="badminton-men" disabled>
                            แบดมินตันเดี่ยวชาย
                        </TabsTrigger>
                        <TabsTrigger value="badminton-women" disabled>
                            แบดมินตันเดี่ยวหญิง
                        </TabsTrigger>
                        <TabsTrigger value="badminton-mixed" disabled>
                            แบดมินตันคู่ผสม
                        </TabsTrigger>
                        <TabsTrigger value="local" disabled>
                            กีฬาพื้นบ้าน
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="mt-8 flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-full sm:w-[80%] mx-auto">
                    <TabsContent value="rov">
                        <p className="text-center sm:text-left">This is RoV</p>
                        <TournamentBracket rounds={tournamentData} />
                    </TabsContent>

                    <TabsContent value="valorant">
                        <p className="text-center sm:text-left">This is Valorant</p>
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
                </div>
            </Tabs>
        </div>
    );
}
