'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RedPage() {
    const router = useRouter();

    const members = [
        {
            name: "ผศ.ดร.ณัฐพร ภักดี",
            title: "แม่สี",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2024/05/34-224x300.png",
        },
        {
            name: "ผศ.เอกภพ บุญเพ็ง",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/42.png",
        },
        {
            name: "ผศ.พีระศักดิ์ เพียรประสิทธิ์",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/36.png",
        },
        {
            name: "อาจารย์สิทธิศักดิ์ แซ่จึง",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2023/12/27-1.png",
        },
        {
            name: "อาจารย์อริย์ธัช ศิรภัทร์วงศ์กร",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2020/07/47.png",
        },
        {
            name: "นายกรสหนันท์ ต่อพงษ์พันธุ์",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/1.png",
        },
        {
            name: "นางสาวนิตยา ติรพงษ์พัฒน์",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/11.png",
        },
        {
            name: "นางสาวหรรษา รอดเงิน",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/3.png",
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="p-12 min-h-screen bg-white">

            <div className="mb-6 flex justify-start">
                <Button variant="secondary" onClick={() => router.push("/")}>
                    Back to Home
                </Button>
            </div>

            <h1 className="text-4xl font-extrabold mb-24 text-center">
                บุคลากรสีแดง <p className="text-red-600">หงส์เพลิง</p>
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
                                className="h-64 rounded-full border-4 border-red-600"
                            />
                        </motion.div>
                        {/* Text Section */}
                        <div className="flex flex-col items-center">
                            <motion.h2 className="text-md md:text-md lg:text-xl">
                                {member.name}
                            </motion.h2>
                            {member.title && (
                                <motion.p className="text-sm md:text-base lg:text-lg text-white font-bold bg-red-600 mt-2 px-4 rounded-full">
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