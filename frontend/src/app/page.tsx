"use client";

import { useState, useEffect } from "react";
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
import TeamLeadersPage from "@/components/TeamLeadersPage";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import UpcomingEvents from "@/components/UpComingEvent";
import Podium from "@/components/Podium";
import { Match } from "./utils/interfaces";
import { api } from '@/app/utils/api.util';
import { useSocket } from "./hooks/useSocket";

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
  const [podiumData, setPodiumData] = useState<{ team: string; rank: number; title: string; score: number; color: string; }[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const { socket } = useSocket();


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

  // Listen for match score updates from WebSocket


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


  const fetchMatch = async () => {
    try {
      const response = await api.get('api/v1/match');
      const data = await response.data.data.matches;

      setMatches(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Listen for match score updates from WebSocket
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.event === 'matchScoresUpdated') {
          fetchMatch();
        }
      };

      return () => {
        socket.onmessage = null;
      };
    }
  }, [socket]);

  useEffect(() => {
    fetchMatch()
  }, [])

  useEffect(() => {

    // Aggregate points for each team
    const teamPoints = matches.reduce<Record<string, { name: string; points: number }>>(
      (acc, match) => {
        match.participants.forEach((participant) => {
          const teamId = participant.team?.id ?? "unknown";
          const teamName = participant.team?.name ?? "Unknown";
          const points = participant.points ?? 0;

          if (!acc[teamId]) {
            acc[teamId] = { name: teamName, points: 0 };
          }
          acc[teamId].points += points;
        });
        return acc;
      },
      {}
    );

    // Sort teams based on points (descending order)
    let sortedTeams = Object.entries(teamPoints)
      .map(([id, { name, points }]) => ({
        id,
        name,
        points,
      }))
      .sort((a, b) => b.points - a.points) // Highest points first
      .map((team, index) => {
        // Assign colors based on team names
        const color = team.name.includes("เขียว")
          ? "bg-green-300"
          : team.name.includes("แดง")
            ? "bg-red-300"
            : team.name.includes("เหลือง")
              ? "bg-yellow-300"
              : team.name.includes("น้ำเงิน")
                ? "bg-blue-300"
                : team.name.includes("ชมพู")
                  ? "bg-pink-300"
                  : "bg-gray-300";

        // Assign ranking titles
        const titles = [
          "ชนะเลิศอันดับที่ 1",
          "รองชนะเลิศอันดับที่ 1",
          "รองชนะเลิศอันดับที่ 2",
          "รองชนะเลิศอันดับที่ 3",
          "รองชนะเลิศอันดับที่ 4",
        ];
        const title = titles[index] || `อันดับที่ ${index + 1}`;

        return {
          team: team.name,
          rank: index + 1,
          title,
          score: team.points,
          color,
        };
      });

    // Ensure rank consistency for teams with equal points
    sortedTeams = sortedTeams.map((team, index, arr) => {
      if (index > 0 && team.score === arr[index - 1].score) {
        team.rank = arr[index - 1].rank;
      }
      return team;
    });

    // Update state
    setPodiumData(sortedTeams);
    setLoading(false);
  }, [matches]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url("/images/bg.jpg")`,
        backgroundSize: "80%",
      }}
    >
      {/* Header Section */}
      <div className="min-h-screen justify-center items-center flex flex-col px-4 text-center bg-white w-full bg-opacity-90">
        <div className="flex justify-center items-center">
          <Image src="/images/ifgames-logo.svg" width={500} height={100} alt="logo" />
        </div>
        <Navigation />
        <UpcomingEvents />
        <Podium teams={podiumData} isLoading={loading} />
        <div className="pb-5 text-sm text-red-500">
          {/* description */}
          <p>*คิดจากคะแนนรวมของทุกชนิดกีฬา</p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center md:min-h-screen mt-12">
        {/* Search Section */}
        <div
          id="search"
          className="w-full max-w-lg p-6 sm:p-8 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-gray-800 p-6">
            ค้นหาสีของคุณ
          </h2>
          <Tabs defaultValue="account" className="w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <TabsList className="flex justify-center">
                <TabsTrigger value="account">นิสิต</TabsTrigger>
                <TabsTrigger value="password">อาจารย์หรือบุคลากร</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="account">
              <Input
                type="text"
                placeholder="ค้นหาด้วยรหัสนิสิต"
                value={userNumber}
                onChange={(e) => setUserNumber(e.target.value)}
                onKeyDown={handleKeyDownStudent}
                required
                className="mb-4"
              />
              <Button
                onClick={handleSearchForStudent}
                disabled={loading || !userNumber.trim()}
                className="w-full bg-blue-700"
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
                className="w-full bg-blue-700"
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

        {/* Results Section */}
        <motion.div
          initial="hidden"
          animate={result ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center w-full max-w-lg mt-8"
        >
          {result && (
            <div className="p-6 bg-white shadow-lg rounded-lg">
              {result.teamName !== "Unknown" ? (
                <>
                  <h3 className="text-xl font-bold mb-2 text-blue-700">
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
                  <Image src={teamImg(result.teamColor)} alt={result.teamName} width={512} height={512} />

                  <h4 className="mt-4 font-semibold text-gray-800">อาจารย์ภายในทีม:</h4>
                  <ul className="list-disc pl-6 text-gray-700">
                    {result.members
                      .filter(
                        (user) =>
                          user.position === "อาจารย์/บุคลากร" ||
                          user.position === "แม่สี"
                      )
                      .map((member) => (
                        <li key={member.username} className="text-sm">
                          {member.name} ({member.position})
                        </li>
                      ))}
                  </ul>

                  {/* <h4 className="mt-4 font-semibold text-gray-800">นิสิตภายในทีม:</h4>
                <ul className="list-disc pl-6 text-gray-700">
                  {result.members
                    .filter((user) => user.position === "นิสิต")
                    .map((member) => (
                      <li key={member.username} className="text-sm">
                        {member.username} ({member.name})
                      </li>
                    ))}
                </ul> */}

                  <div className="text-center">
                    <p className="text-lg font-medium text-gray-700 mt-8">
                      เข้าร่วมกลุ่มไลน์ OpenChat{" "}
                      <a
                        href={teamLine(result.teamColor)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        คลิกที่นี่
                      </a>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      หรือ สแกน QR Code ด้านล่าง
                    </p>
                    <Image
                      src={teamLineQR(result.teamColor)}
                      width={512}
                      height={512}
                      alt="Line QR Code"
                      className="w-1/2 mx-auto mt-4 border border-gray-300 rounded-lg shadow-md"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg sm:text-xl font-bold text-red-500">
                    ดูเหมือนคุณยังไม่ได้เข้าร่วมทีมใดๆ ใน IF Games 2024
                  </h3>
                  <p className="text-sm sm:text-base">
                    โปรดติดต่อทีมงานหากพบปัญหาหรือต้องการข้อมูลเพิ่มเติม
                  </p>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Team Colors Section */}
      <div id="team-color" className="p-12 min-h-screen mt-12 bg-white bg-opacity-90 w-full">
        <TeamLeadersPage />
      </div>
    </div>
  );
}

// Helper functions
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

function teamLine(teamColor: string) {
  switch (teamColor) {
    case "แดง":
      return "https://line.me/ti/g2/GA9IjFdq3Jb19D7N4kpNvzPpnUwtpectOZBvXg?utm_source=invitation&utm_medium=link_copy&utm_campaign=default";
    case "น้ำเงิน":
      return "https://line.me/ti/g2/scK-7rTJdAH0GpNms4oBHdqlVth869vxHyVbpg?utm_source=invitation&utm_medium=link_copy&utm_campaign=default";
    case "เขียว":
      return "https://line.me/ti/g2/zTxtILh8LEeHR_-d_l7jNeGlitr_XR6az5emJA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default";
    case "เหลือง":
      return "https://line.me/ti/g2/PzKYfhXSF2kYf7wX9wjIQA_vjKxp0b0cIMVdpw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default";
    case "ชมพู":
      return "https://line.me/ti/g2/faS7QJuHk6ljU6Jyz2gb3Z4QcHyWSVErFG6BFQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default";
    default:
      return "https://line.me/R/ti/g/1J9Z9Z9z9Z";
  }
};

function teamLineQR(teamColor: string) {
  switch (teamColor) {
    case "แดง":
      return "/images/red-qr.jpg";
    case "น้ำเงิน":
      return "/images/blue-qr.jpg";
    case "เขียว":
      return "/images/green-qr.jpg";
    case "เหลือง":
      return "/images/yellow-qr.jpg";
    case "ชมพู":
      return "/images/pink-qr.jpg";
    default:
      return "/images/gray-qr.jpg";
  }
}
