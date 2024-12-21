'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function GreenPage() {
    const router = useRouter();

    const members = [
        {
            name: "ผศ.ภูสิต กุลเกษม",
            title: "แม่สี",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2024/05/pusit--224x300.png",
        },
        {
            name: "ผศ.พิเชษ วะยะลุน",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/39.png",
        },
        {
            name: "ดร.วรัณรัชญ์ วิริยะวิทย์",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2023/08/26.png",
        },
        {
            name: "ผศ.ดร.สุภาวดี ศรีคำดี",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/19.png",
        },
        {
            name: "ดร.พลวัต ช่อผูก",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2021/06/38.png",
        },
        {
            name: "นางสาวณิชานันท์ ชำนาญช่าง",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/8.png",
        },
        {
            name: "นางสาวอรอนงค์ ร้อยทา",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/5.png",
        },
        {
            name: "นายกิจจา สังข์ทอง",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2024/11/Pic-Personel-3-e1730443556546-1.png",
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="p-12 min-h-screen bg-white">

            <div className="mb-6 flex justify-center">
                <Button variant="secondary" onClick={() => router.push("/")}>
                    <Home className="h-6 w-6" />
                </Button>
            </div>

            <h1 className="text-4xl font-extrabold mb-24 text-center">
                บุคลากรสีเขียว <p className="text-green-800">นาคา</p>
            </h1>

            <div className="flex flex-wrap justify-center gap-24">
                {members.map((member, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-col items-center rounded-xl text-center text-black`}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* Image Section */}
                        <motion.div className="flex h-64 items-center justify-center mb-4">
                            <motion.img
                                src={member.image}
                                alt={member.name}
                                className="h-64 rounded-full border-4 border-green-800"
                            />
                        </motion.div>
                        {/* Text Section */}
                        <div className="flex flex-col items-center">
                            <motion.h2 className="text-md md:text-md lg:text-xl">
                                {member.name}
                            </motion.h2>
                            {member.title && (
                                <motion.p className="text-sm md:text-base lg:text-lg text-white font-bold bg-green-800 mt-2 px-4 rounded-full">
                                    {member.title}
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}