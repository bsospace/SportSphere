"use client";

import { useParams, useRouter } from "next/navigation";

// Mock data simulating database fetch
const sports = [
  { id: 1, name: "Football", slug: "FB" },
  { id: 2, name: "Basketball", slug: "BKB" },
  { id: 3, name: "Futsal", slug: "FUT" },
];

const matches = [
  { id: 1, name: "Match 1", sport_id: 1, type: "Final", location: "Stadium A", time: "2025-01-27 18:00" },
  { id: 2, name: "Match 2", sport_id: 1, type: "Semifinal", location: "Stadium B", time: "2025-01-28 20:00" },
  { id: 3, name: "Match 3", sport_id: 2, type: "Group Stage", location: "Arena X", time: "2025-01-30 16:00" },
];

const participants = [
  { id: 1, team_id: 1, match_id: 1, rank: 1, point: 3, score: "2" },
  { id: 2, team_id: 2, match_id: 1, rank: 2, point: 0, score: "1" },
  { id: 3, team_id: 3, match_id: 2, rank: 1, point: 3, score: "0" },
  { id: 4, team_id: 4, match_id: 2, rank: 2, point: 0, score: "3" },
];

const teams = [
  { id: 1, name: "Team A" },
  { id: 2, name: "Team B" },
  { id: 3, name: "Team C" },
  { id: 4, name: "Team D" },
];

export default function SportDetail() {
  const { slug } = useParams() as { slug: string | undefined }; // ดึง slug จาก dynamic route
  const [sportSlug, sportId] = slug ? slug.split("-") : [null, null];
  const router = useRouter(); // ใช้ router สำหรับการ redirect

  // Fetch sport, matches, and participants data
  const sport = sports.find((s) => s.slug === sportSlug && s.id.toString() === sportId);
  const sportMatches = matches.filter((m) => m.sport_id.toString() === sportId);

  const handleCardClick = () => {
    router.push(`/sport/${sportSlug}/${sportId}`); // Redirect ไปที่ sport detail page
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-8">
      {sport ? (
        <>
          {/* ชื่อกีฬา */}
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{sport.name}</h1>

          {/* รายการแมตช์ */}
          <div className="w-full max-w-4xl">
            {sportMatches.map((match) => {
              const matchParticipants = participants.filter((p) => p.match_id === match.id);
              const teamA = teams.find((t) => t.id === matchParticipants[0]?.team_id);
              const teamB = teams.find((t) => t.id === matchParticipants[1]?.team_id);
              const scoreA = matchParticipants[0]?.score;
              const scoreB = matchParticipants[1]?.score;

              return (
                <div
                  key={match.id}
                  className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={handleCardClick} // เพิ่มการจับคลิกที่การ์ด
                >
                  {/* Section Head */}
                  <div className="p-5 bg-gray-200 text-gray-800 text-xl font-semibold">
                    {match.name}
                  </div>

                  {/* Section Body */}
                  <div className="p-5 flex flex-col gap-4 bg-gray-50">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <div className="text-lg text-gray-800">
                        <span className="font-bold text-indigo-600">{teamA?.name}</span> vs <span className="font-bold text-indigo-600">{teamB?.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">{match.time}</div>
                    </div>
                    <div className="text-sm text-gray-700">Location: {match.location}</div>

                    {/* การแสดงผลคะแนน */}
                    <div className="flex justify-between text-lg font-bold text-gray-800 mt-2">
                      <div>{teamA?.name}: <span className="text-blue-500">{scoreA}</span></div>
                      <div>{teamB?.name}: <span className="text-blue-500">{scoreB}</span></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-lg text-red-500">ไม่มีข้อมูลกีฬา</p>
      )}
    </div>
  );
}
