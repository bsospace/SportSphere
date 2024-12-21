"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TeamLeadersPage from "../components/TeamLeadersPage";

const variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};

export default function HomePage() {
  const [userNumber, setUserNumber] = useState("");
  const [username, setUsername] = useState("");
  interface TeamResult {
    username: string;
    fullName: string;
    position: string;
    teamName: string;
    teamColor: string;
    members: { username: string | number; name: string; position: string; study_field: string; year: number }[];
  }

  const [result, setResult] = useState<TeamResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchForStudent = async () => {
    if (!userNumber.trim()) {
      setError("กรุณากรอกรหัสนิสิตก่อนทำการค้นหา");
      return;
    }
    setLoading(true);
    setResult(null);
    setError("");

    const response = await fetch(`/api/search?username=${userNumber}`);
    if (response.ok) {
      const data = await response.json();
      setResult(data.data);
    } else {
      setError("ไม่พบผู้ใช้งาน กรุณาตรวจสอบรหัสนิสิตของคุณ.");
    }
    setLoading(false);
  };

  const handleSearchForTeacher = async () => {
    if (!username.trim()) {
      setError("กรุณากรอกชื่อผู้ใช้งานก่อนทำการค้นหา");
      return;
    }
    setLoading(true);
    setResult(null);
    setError("");

    const response = await fetch(`/api/searchTeacher?username=${username}`);
    if (response.ok) {
      const data = await response.json();
      setResult(data.data);
    } else {
      setError("ไม่พบผู้ใช้งาน กรุณาตรวจสอบชื่อของคุณ.");
    }
    setLoading(false);
  };

  const handleKeyDownStudent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchForStudent();
    }
  };

  const handleKeyDownTeacher = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchForTeacher();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
        Welcome to IF Games 2024 🏅
      </h1>
      <TeamLeadersPage />

      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          ค้นหาสีของคุณ
        </h2>
        <Tabs defaultValue="account" className="w-full">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="account">นิสิต</TabsTrigger>
              <TabsTrigger value="password">อาจารย์หรือบุคคลากร</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="account">
            <Input
              type="text"
              placeholder="ค้นหารหัสนิสิต"
              value={userNumber}
              onChange={(e) => setUserNumber(e.target.value)}
              onKeyDown={handleKeyDownStudent}
              required
              className="mb-4"
            />
            <Button
              onClick={handleSearchForStudent}
              disabled={loading || !userNumber.trim()}
              className="w-full"
            >
              {loading ? "กำลังค้นหา..." : "ค้นหา"}
            </Button>
          </TabsContent>
          <TabsContent value="password">
            <Input
              type="text"
              placeholder="ค้นหาด้วยชื่อ"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDownTeacher}
              required
              className="mb-4"
            />
            <Button
              onClick={handleSearchForTeacher}
              disabled={loading || !username.trim()}
              className="w-full"
            >
              {loading ? "กำลังค้นหา..." : "ค้นหา"}
            </Button>
          </TabsContent>
        </Tabs>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>เกิดข้อผิดพลาด</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <motion.div
        initial="hidden"
        animate={result ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.5 }}
        className="mt-6 w-full max-w-lg"
      >
        {result && (
          <div className="p-6 bg-white shadow-lg rounded-lg">
            {result.teamName !== "Unknown" ? (
              <>
                <h3 className="text-xl font-bold mb-2 text-blue-500">
                  สวัสดี, {result.fullName}!
                </h3>
                <p className="text-lg mb-4">
                  คุณอยู่ในทีม:{" "}
                  <span
                    className="font-semibold px-2 py-1 rounded"
                    style={{
                      backgroundColor: teamColor(result.teamColor),
                      color: "white",
                    }}
                  >
                    {result.teamName}
                  </span>
                </p>
                <img src={teamImg(result.teamColor)} alt={result.teamName} />
              </>
            ) : (
              <>
              <h3 className="text-xl font-bold text-red-500">
                ดูเหมือนคุณยังไม่ได้เข้าร่วมทีมใดๆ ใน IF Games 2024
              </h3>
              <p>โปรดติดต่อทีมงานหากพบปัญหาหรือต้องการข้อมูลเพิ่มเติม</p>
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Helper functions for team details
function teamColor(teamColor: string) {
  const colors: Record<string, string> = {
    แดง: "red",
    น้ำเงิน: "blue",
    เขียว: "green",
    เหลือง: "yellow",
    ชมพู: "pink",
  };
  return colors[teamColor] || "gray";
}

function teamImg(teamColor: string) {
  const images: Record<string, string> = {
    แดง: "/images/red-team.png",
    น้ำเงิน: "/images/blue-team.png",
    เขียว: "/images/green-team.png",
    เหลือง: "/images/yellow-team.png",
    ชมพู: "/images/pink-team.png",
  };
  return images[teamColor] || "/images/gray-team.png";
}
