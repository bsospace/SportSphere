'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navigation() {
    const navItems = [
        { name: "ข้อมูลสี", path: "#team-color" },
        { name: "กำหนดการแข่งขัน", path: "", hide: true },
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
                        onClick={() => handleScroll(item.path)}
                        className={item.hide ? "hidden" : "w-full px-3 py-2 rounded-full text-sm font-medium bg-blue-700 text-white"}
                    >
                        {item.name}
                    </Button>
                ))}
            </div>
        </motion.nav>
    );
}
