/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "../../utils/api.util";

export default function SportDetail() {
  const { slug } = useParams() as { slug: string | undefined };
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      // Fetch data using the API utility
      api
        .get(`api/v1/match/${slug}`) // Adjusted to match a more RESTful endpoint
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Failed to fetch data");
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!data?.success) return <p className="text-center text-red-500">Invalid data</p>;

  const { sport, matches } = data.data;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{sport.name}</h1>

      <div className="w-full max-w-4xl">
        {matches.map((match: any) => (
          <div
            key={match.id}
            onClick={() => router.push(`/sport/${slug}/${match.id}`)} // Redirect when clicked
            className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
          >
            <div className="p-5 bg-gray-200 text-gray-800 text-xl font-semibold">
              {match.type.toUpperCase()} - {match.matchName}
            </div>

            <div className="p-5 flex flex-col gap-4 bg-gray-50">
              <div className="flex justify-between items-center text-lg font-semibold">
                <div className="text-lg text-gray-800">
                  <span className="font-bold text-indigo-600">
                    {match.participants[0]?.team?.name}
                  </span>{" "}
                  vs{" "}
                  <span className="font-bold text-indigo-600">
                    {match.participants[1]?.team?.name}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-700">Location: {match.location}</div>
              <div className="text-sm text-gray-700">
                Date Time: {new Date(match.date).toLocaleString("th-TH", {
                  weekday: "long",  // Full weekday name (e.g., "วันอาทิตย์")
                  year: "numeric",  // Full year (e.g., "2025")
                  month: "long",  // Full month name (e.g., "มกราคม")
                  day: "numeric",  // Day of the month (e.g., "27")
                })}
              </div>


              <div className="flex justify-between text-lg font-bold text-gray-800 mt-2">
                <div>
                  {match.participants[0]?.team?.name}:{" "}
                  <span className="text-blue-500">
                    {match.participants[0]?.score}
                  </span>
                </div>
                <div>
                  {match.participants[1]?.team?.name}:{" "}
                  <span className="text-blue-500">
                    {match.participants[1]?.score}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
