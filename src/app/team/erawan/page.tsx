'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PinkPage() {
    const router = useRouter();

    const members = [
        {
            name: "ผศ.ดร.อธิตา อ่อนเอื้อน",
            title: "แม่สี",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2024/05/16-224x300.png",
        },
        {
            name: "รศ.ดร.กฤษณะ ชินสาร",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/25.png",
        },
        {
            name: "ดร.วัชรพงศ์ อยู่ขวัญ",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2022/10/22.png",
        },
        {
            name: "ดร.กามาล บาฮะ",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2023/06/33.png",
        },
        {
            name: "อาจารย์จิรายุส อาบกิ่ง",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2022/10/31.png",
        },
        {
            name: "รศ.ดร.ณัฐนนท์ ลีลาตระกูล",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/37.png",
        },
        {
            name: "นางสาวปัทมา วชิรพันธุ์",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/10.png",
        },
        {
            name: "นายเกรียงศักดิ์ ปานโพธิ์ทอง",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/004.png",
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div 
            className="p-12 min-h-screen bg-white"
        >
            
            <div className="mb-6 flex justify-start">
                <Button variant="secondary" onClick={() => router.push("/")}>
                    Back to Home
                </Button>
            </div>

            <h1 className="text-4xl font-extrabold mb-24 text-center">
                บุคลากรสีชมพู <p className="text-pink-400">เอราวัณ</p>
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
                                className="h-64 rounded-full border-4 border-pink-400"
                            />
                        </motion.div>
                        {/* Text Section */}
                        <div className="flex flex-col items-center">
                            <motion.h2 className="text-md md:text-md lg:text-xl">
                                {member.name}
                            </motion.h2>
                            {member.title && (
                                <motion.p className="text-sm md:text-base lg:text-lg text-white font-bold bg-pink-400 mt-2 px-4 rounded-full">
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