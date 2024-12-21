'use client';

import React from "react";
import { motion } from "framer-motion";

export default function RedPage() {
    const members = [
        {
            name: "ผศ.พิเชษ วะยะลุน",
            title: "Title 1",
            gradient: "bg-gradient-to-r from-green-600 to-green-200",
            image: "/images/teachers/member1.png", // Replace with actual image path
        },
        {
            name: "ดร.วรัชนี วิริยะวิทย์",
            title: "Title 2",
            gradient: "bg-gradient-to-r from-blue-600 to-blue-200",
            image: "/images/teachers/member2.png", // Replace with actual image path
        },
        {
            name: "ผศ.ดร.สุกาวดี ศรีคำดี",
            title: "Title 3",
            gradient: "bg-gradient-to-r from-pink-600 to-pink-200",
            image: "/images/teachers/member3.png", // Replace with actual image path
        },
        {
            name: "ดร.พลวัชต์ ช่วยมุต",
            title: "Title 4",
            gradient: "bg-gradient-to-r from-red-600 to-red-200",
            image: "/images/teachers/member4.png", // Replace with actual image path
        },
        {
            name: "ผศ.ภูสิต กุลเกษม",
            title: "Title 5",
            gradient: "bg-gradient-to-r from-yellow-600 to-yellow-200",
            image: "/images/teachers/member5.png", // Replace with actual image path
        },
        {
            name: "นางสาวอนิชามาศ ชำนาญช่าง",
            title: "Title 6",
            gradient: "bg-gradient-to-r from-purple-600 to-purple-200",
            image: "/images/teachers/member6.png", // Replace with actual image path
        },
        {
            name: "นางสาววรภรณ์ รอยภา",
            title: "Title 7",
            gradient: "bg-gradient-to-r from-indigo-600 to-indigo-200",
            image: "/images/teachers/member7.png", // Replace with actual image path
        },
        {
            name: "นายกิตจา สังข์ทอง",
            title: "Title 8",
            gradient: "bg-gradient-to-r from-teal-600 to-teal-200",
            image: "/images/teachers/member8.png", // Replace with actual image path
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="bg-gray-100 p-12 mb-6">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
                บุคลากรสีแดง หงส์เพลิง
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {members.map((member, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-col items-center rounded-xl shadow-xl p-6 text-center text-white ${member.gradient}`}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.div className="flex h-36 w-36 items-center justify-center mb-4">
                            <motion.img
                                src={member.image}
                                alt={member.name}
                                className="w-36 h-36 rounded-full border-4 border-white"
                            />
                        </motion.div>
                        <div className="flex flex-col items-center">
                            <motion.h1 className="text-lg md:text-xl lg:text-2xl font-bold">
                                {member.name}
                            </motion.h1>
                            <motion.p className="text-sm md:text-base lg:text-lg text-white">
                                {member.title}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}