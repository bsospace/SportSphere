import React from "react";
import { motion } from "framer-motion";

export default function TeamLeadersPage() {
    const leaders = [
        {
            name: "Naka",
            title: "ผศ.ภูสิต กุลเกษม",
            gradient: "bg-gradient-to-r from-green-600 to-green-200",
            image: "/images/teachers/pusit.png",
        },
        {
            name: "SuBunatee",
            title: "ผศ.ดร.โกเมศ อัมพวัน",
            gradient: "bg-gradient-to-r from-blue-600 to-blue-200",
            image: "/images/teachers/gomate.png",
        },
        {
            name: "Erawan",
            title: "ผศ.ดร.อธิตา อ่อนเอื้อน",
            gradient: "bg-gradient-to-r from-pink-600 to-pink-200",
            image: "/images/teachers/jane.png",
        },
        {
            name: "Pheonix",
            title: "ผศ.ดร.ณัฐพร ภักดี",
            gradient: "bg-gradient-to-r from-red-600 to-red-200",
            image: "/images/teachers/wan.png",
        },
        {
            name: "Gilen",
            title: "ผศ.เบญจวรรณ จันทรทองกุล",
            gradient: "bg-gradient-to-r from-yellow-600 to-yellow-200",
            image: "/images/teachers/ben.png",
        },
    ];

    // Animation variants for Framer Motion
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="bg-gray-100 p-12">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
                Team Color
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {leaders.map((leader, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-col items-center justify-center rounded-xl shadow-xl p-6 text-center text-white ${leader.gradient} cursor-pointer`}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => window.open(`https://www.google.com/search?q=${leader.name}`)}
                    >
                        {/* Image Section */}
                        <motion.div className="flex h-36 w-36 items-center justify-center mb-4">
                            <motion.img
                                src={leader.image}
                                alt={leader.name}
                                className="w-36 h-36 rounded-full border-4 border-white"
                                whileHover={{ rotate: [0, 10, -10, 10, -10, 0] }}
                            />
                        </motion.div>
                        {/* Text Section */}
                        <div className="flex flex-col items-center">
                            <motion.h1
                                className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight"
                                whileHover={{ scale: 1.1 }}
                            >
                                {leader.name}
                            </motion.h1>
                            <motion.p
                                className="text-sm md:text-base lg:text-lg text-white"
                                whileHover={{ scale: 1.05 }}
                            >
                                {leader.title}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}