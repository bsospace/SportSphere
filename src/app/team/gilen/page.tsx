'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function RedPage() {
    const router = useRouter();

    const members = [
        {
            name: "ผศ.เบญจภรณ์ จันทรกองกุล",
            title: "แม่สี",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2024/05/15-224x300.png",
        },
        {
            name: "ผศ.ดร.ประจักษ์ จิตเงินมะดัน",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/07/40.png",
        },
        {
            name: "อาจารย์ประวิทย์ บุญมี",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/41.png",
        },
        {
            name: "ผศ.ดร.อังศุมาลี สุทธภักติ",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/20.png",
        },
        {
            name: "ดร. คนึงนิจ กุโบลา",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/32.png",
        },
        {
            name: "รศ.ดร.สุนิสา ริมเจริญ",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/10/18.png",
        },
        {
            name: "กมลวรรณ แสงระวี",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/12.png",
        },
        {
            name: "กุลชลี รัตนคร",
            image: "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/4.png",
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
                บุคลากรสีเหลือง <p className="text-yellow-500">กิเลนทองคำ</p>
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
                                className="h-64 rounded-full border-4 border-yellow-500"
                            />
                        </motion.div>
                        {/* Text Section */}
                        <div className="flex flex-col items-center">
                            <motion.h2 className="text-md md:text-md lg:text-xl">
                                {member.name}
                            </motion.h2>
                            {member.title && (
                                <motion.p className="text-sm md:text-base lg:text-lg text-white font-bold bg-yellow-500 mt-2 px-4 rounded-full">
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
