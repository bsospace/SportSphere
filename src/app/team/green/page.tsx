'use client';

import React from "react";
import { motion } from "framer-motion";

export default function GreenPage() {
    const members = [
        {
            name: "ผศ.ภูสิต กุลเกษม",
            title: "แม่สี",
            gradient: "bg-gradient-to-r from-green-400 to-green-700",
            image: "/images/teachers/green/Pusit.png",
        },
        {
            name: "ผศ.พิเชษ วะยะลุน",
            gradient: "bg-gradient-to-r from-green-500 to-green-600",
            image: "/images/teachers/green/Pichet.png",
        },
        {
            name: "ดร.วรัณรัชญ์ วิริยะวิทย์",
            gradient: "bg-gradient-to-r from-green-500 to-green-600",
            image: "/images/teachers/green/Waranrach.png",
        },
        {
            name: "ผศ.ดร.สุภาวดี ศรีคำดี",
            gradient: "bg-gradient-to-r from-green-500 to-green-600",
            image: "/images/teachers/green/Supawadee.png",
        },
        {
            name: "ดร.พลวัต ช่อผูก",
            gradient: "bg-gradient-to-r from-green-500 to-green-600",
            image: "/images/teachers/green/Ponlawat.png",
        },
        {
            name: "นางสาวณิชานันท์ ชำนาญช่าง",
            gradient: "bg-gradient-to-r from-green-500 to-green-600",
            image: "/images/teachers/green/Nichanan.png",
        },
        {
            name: "นางสาวอรอนงค์ ร้อยทา",
            gradient: "bg-gradient-to-r from-green-500 to-green-600",
            image: "/images/teachers/green/Onanong.png",
        },
        {
            name: "นายกิจจา สังข์ทอง",
            gradient: "bg-gradient-to-r from-green-500 to-green-600",
            image: "/images/teachers/green/Kitja.png",
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="bg-gray-100 p-12 mb-6">
            <h1 className="text-4xl font-extrabold mb-12 text-center text-black">
                บุคลากรสีเขียว นาคา
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
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
                        <motion.div className="flex h-48 w-36 items-center justify-center mb-4">
                            <motion.img
                                src={member.image}
                                alt={member.name}
                                className="h-48 rounded-full border-4 border-green-800"
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