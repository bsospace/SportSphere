"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// กำหนดประเภทของข้อมูล sports
interface Sport {
  id: string;
  name: string;
  slug: string;
}

export default function Sport() {
  const router = useRouter();
  const [sports, setSports] = useState<Sport[]>([]); // กำหนดประเภทเป็น Sport[]

  const apiUrl = process.env.NEXT_PUBLIC_API_SPORT; // อ่านค่าจาก .env

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/sports`);
        if (!response.ok) {
          throw new Error("Failed to fetch sports data");
        }
        const data = await response.json();
        setSports(data.data); // ตั้งค่า sports จากข้อมูลที่ได้รับ
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchSports();
  }, [apiUrl]); // ใช้ apiUrl ในการดึงข้อมูล

  const handleRedirect = (slug: string, id: string) => {
    router.push(`/sport/${slug}`);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-gray-400 flex flex-col gap-4 p-4 rounded-lg">
        {sports.length > 0 ? (
          sports.map((sport) => (
            <div
              key={sport.id}
              onClick={() => handleRedirect(sport.slug, sport.id)}
              className="shadow-lg p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-200 transition"
            >
              {sport.name}
            </div>
          ))
        ) : (
          <div>Loading sports...</div>
        )}
      </div>
    </div>
  );
}
