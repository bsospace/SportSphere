'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function BluePage() {
    const router = useRouter();

    const members = [
        {
            name: "ผศ.ดร.โกเมศ อัมพวัน",
            title: "แม่สี",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2024/05/35-224x300.png",
        },
        {
            name: "ผศ.ดร.อุรีรัฐ สุขสวัสดิ์ชน",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/21.png",
        },
        {
            name: "ผศ.ดร.จักริน สุขสวัสดิ์ชน",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/29.png",
        },
        {
            name: "อาจารย์วรวิทย์ วีระพันธุ์",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/23.png",
        },
        {
            name: "อาจารย์วิทวัส พันธุมจินดา",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/24.png",
        },
        {
            name: "อาจารย์เหมรัศมิ์ วชิรหัตถพงศ์",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/Pic-Personel-110-x-147-px.png",
        },
        {
            name: "นายสิทธิพงษ์ ฉิมไทย",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/6.png",
        },
        {
            name: "นางสาวเปรมปรีดา สลับสี",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/Pic-Personel-110-x-147-px.png",
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="p-12 min-h-screen bg-white">
            
            <div className="mb-6 flex justify-center">
                <Button variant="secondary" onClick={() => router.push("/")} className="rounded-full shadow-md">
                    <Home className="h-6 w-6" />
                </Button>
            </div>

            <h1 className="text-4xl font-extrabold mb-24 text-center">
                บุคลากรสีนำ้เงิน <p className="text-blue-800">สุบรรณนที</p>
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
                                className="h-64 rounded-full border-4 border-blue-800 shadow-md"
                            />
                        </motion.div>
                        {/* Text Section */}
                        <div className="flex flex-col items-center">
                            <motion.h2 className="text-md md:text-md lg:text-xl">
                                {member.name}
                            </motion.h2>
                            {member.title && (
                                <motion.p className="text-sm md:text-base lg:text-lg text-white font-bold bg-blue-800 mt-2 px-4 rounded-full">
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