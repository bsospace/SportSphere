"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};

export default function HomePage() {
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

  const handleSearch = async () => {
    setLoading(true);
    setResult(null);
    setError("");

    const response = await fetch(`/api/search?username=${username}`);
    if (response.ok) {
      const data = await response.json();
      setResult(data.data);
    } else {
      setError("ไม่พบผู้ใช้งาน กรุณาตรวจสอบรหัสนิสิตของคุณ.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
        Welcome to IF Games 2024 🏅
      </h1>

      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          ค้นหาสีของคุณ
        </h2>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="กรอกรหัสนิสิต"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className={`w-full py-3 rounded-lg text-white font-bold transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "กำลังค้นหา..." : "ค้นหา"}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">{error}</p>
            <ul className="mt-2 list-disc pl-6 text-sm text-gray-700">
              <li>ตรวจสอบรหัสนิสิตของคุณ.</li>
              <li>สอบถามเพิ่มเติมจากทีมงานหากพบปัญหา.</li>
              <li>ลองใหม่อีกครั้งหรือแจ้งผู้ดูแลระบบ.</li>
            </ul>
          </div>
        )}
        </div>

        <motion.div
          initial="hidden"
          animate={result ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          {result && (
            <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-blue-500">
                สวัสดี, {result.fullName}!
              </h3>
              <p className="text-lg mb-4">
                คุณอยู่ในทีม:{" "}
                <span
                  className="font-semibold px-2 py-1 rounded"
                >
                  {result.teamName}
                </span>
              </p>
              <img src={teamImg(result.teamColor)} alt={result.teamName} />

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

              <div className="text-center mt-6">
                <p className="text-lg font-medium text-gray-700">
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
                <img
                  src={teamLineQR(result.teamColor)}
                  alt="Line QR Code"
                  className="w-1/2 mx-auto mt-4 border border-gray-300 rounded-lg shadow-md"
                />
              </div>
            </div>
          )}
        </motion.div>
    </div>
  );
}

function teamImg(teamColor: string) {
    switch (teamColor) {
      case "แดง":
        return "/images/red-team.png";
      case "น้ำเงิน":
        return "/images/blue-team.png";
      case "เขียว":
        return "/images/green-team.png";
      case "เหลือง":
        return "/images/yellow-team.png";
      case "ชมพู":
        return "/images/pink-team.png";
      default:
        return "/images/gray-team.png";
    }
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
      return "/images/red-qr.png";
    case "น้ำเงิน":
      return "/images/blue-qr.png";
    case "เขียว":
      return "/images/green-qr.png";
    case "เหลือง":
      return "/images/yellow-qr.png";
    case "ชมพู":
      return "/images/pink-qr.png";
    default:
      return "/images/gray-qr.png";
  }
}