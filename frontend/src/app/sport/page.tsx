"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../utils/api.util";
import { useAuth } from "../hooks/useAuth";
import { Trophy, Loader2, Home } from "lucide-react";

interface Sport {
  id: string;
  name: string;
  slug: string;
}

export default function Sport() {
  const router = useRouter();
  const [sports, setSports] = useState<Sport[]>([]);
  const { isAuthenticated, isLoading } = useAuth();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await api.get(`/api/v1/sports`);
        const data = await response.data;
        setSports(data.data);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchSports();
  }, []);

  const handleRedirect = (slug: string) => {
    router.push(`/sport/${slug}`);
  };

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      window.location.href = `/auth/login?redirect=/sport`;
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Select Your Sport</h1>
        <p className="text-gray-600">Choose a sport to explore events and competitions</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button className='flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200' onClick={() => window.location.href = `/`}>
          <Home size={20} />
          Home
        </button>
        </div>
      </div>

      {/* Sports Grid */}
      <div className="max-w-4xl mx-auto">
        {sports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports.map((sport) => (
              <div
                key={sport.id}
                onClick={() => handleRedirect(sport.slug)}
                onMouseEnter={() => setIsHovered(sport.id)}
                onMouseLeave={() => setIsHovered(null)}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Trophy 
                      className={`w-8 h-8 ${
                        isHovered === sport.id 
                          ? "text-blue-500" 
                          : "text-gray-400"
                      } transition-colors duration-300`}
                    />
                    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-${isHovered === sport.id ? '10' : '0'} transition-opacity duration-300`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {sport.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Click to view events
                  </p>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform origin-left transition-transform duration-300 ${
                  isHovered === sport.id ? "scale-x-100" : "scale-x-0"
                }`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-2" />
            <span className="text-gray-600">Loading sports...</span>
          </div>
        )}
      </div>
    </div>
  );
}