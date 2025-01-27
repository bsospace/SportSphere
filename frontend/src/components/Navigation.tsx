'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const router = useRouter();

    const navItems = [
        { name: "ข้อมูลสี", path: "#team-color", hide: false },
        { name: "กำหนดการแข่งขัน", path: "/match" },
        { name: "ค้นหาสีของคุณ", path: "#search" },
    ];

    // Smooth scrolling to sections
    const handleScroll = (path: string) => {
        if (path.startsWith("#")) {
            const section = document.querySelector(path);
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    return (
        <motion.nav
            className="max-w-md p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex justify-center items-center gap-6">
                {navItems.map((item, index) => (
                    <Button
                        key={index}
                        variant="default"
                        onClick={() => {
                            if (item.path.startsWith("/")) {
                                router.push(item.path);
                            }
                            handleScroll(item.path);
                        }}
                        className={item.hide ? "hidden" : "w-full px-3 py-2 rounded-full text-sm font-medium bg-blue-700 text-white"}
                    >
                        {item.name}
                    </Button>
                ))}
            </div>
        </motion.nav>
    );
}
