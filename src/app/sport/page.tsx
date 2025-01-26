"use client";

import { useRouter } from "next/navigation";

// Mock data
const sports = [
  { id: 1, name: "Football", slug: "FB" },
  { id: 2, name: "Basketball", slug: "BKB" },
  { id: 3, name: "Futsal", slug: "FUT" },
  { id: 4, name: "Badminton", slug: "BDM" },
];

export default function Sport() {
  const router = useRouter();

  const handleRedirect = (slug, id) => {
    router.push(`/sport/${slug}-${id}`);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className="bg-gray-400 flex flex-col gap-4 p-4 rounded-lg">
        {sports.map((sport) => (
          <div
            key={sport.id}
            onClick={() => handleRedirect(sport.slug, sport.id)}
            className="shadow-lg p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-200 transition"
          >
            {sport.name}
          </div>
        ))}
      </div>
    </div>
  );
}
