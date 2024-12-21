import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TeamLeadersPage() {
    const router = useRouter();

    const leaders = [
        {
            name: "Naka",
            title: "สีเขียว นาคา",
            gradient: "rgba(34, 139, 34, 0.6)",
            image: "/images/teachers/pusit.png",
            bg: "/images/mascot/naka.png",
        },
        {
            name: "SuBunatee",
            title: "สีน้ำเงิน สุบรรณนที",
            gradient: "rgba(0, 0, 205, 0.6)",
            image: "/images/teachers/gomate.png",
            bg: "/images/mascot/subunatee.png",
        },
        {
            name: "Erawan",
            title: "สีชมพู เอราวัณ",
            gradient: "rgba(255, 20, 147, 0.6)",
            image: "/images/teachers/jane.png",
            bg: "/images/mascot/erawan.png",
        },
        {
            name: "Pheonix",
            title: "สีแดง หงส์เพลิง",
            gradient: "rgba(180, 0, 0, 0.6)",
            image: "/images/teachers/wan.png",
            bg: "/images/mascot/pheonix.png",
        },
        {
            name: "Gilen",
            title: "สีเหลือง กิเลนทองคำ",
            gradient: "rgba(255, 215, 0, 0.6)",
            image: "/images/teachers/ben.png",
            bg: "/images/mascot/gilen.png",
        },
    ];

    // Animation variants for Framer Motion
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <h1 
                className="text-4xl font-extrabold mb-8 text-center"
            >
                Team Color
            </h1>

            <div className="flex flex-wrap justify-center gap-12">
                {leaders.map((leader, index) => (
                    <motion.div
                        key={index}
                        className="md:w-64 w-full flex flex-col items-center justify-center rounded-xl shadow-xl p-6 text-center text-white cursor-pointer"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push(`/team/${leader.name.toLowerCase()}`)}
                        style={{
                            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), ${leader.gradient}, ${leader.gradient}, rgba(0,0,0,0.8)), url(${leader.bg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Image Section */}
                        <motion.div className="flex h-36 w-36 items-center justify-center mb-4">
                            <motion.img
                                src={leader.image}
                                alt={leader.name}
                                className="w-36 h-36 rounded-full"
                                whileHover={{ rotate: [0, 5, -5, 5, -5, 0] }}
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
