/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { api } from '../../utils/api.util';
import { useAuth } from '@/app/hooks/useAuth';
import { Loader2, Trophy, Home } from 'lucide-react';
import { formatDateRange } from '@/app/utils/formatdate-range.util';

export default function SportDetail() {
  const { isAuthenticated, isLoading } = useAuth();
  const { slug } = useParams() as { slug: string | undefined };
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      api
        .get(`/api/v1/match/${slug}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response?.data?.message || 'Failed to fetch data');
          setLoading(false);
        });
    }
  }, [slug]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      window.location.href = `/auth/login?redirect=/sport/${slug}`;
    }
  }, [isAuthenticated, isLoading, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!data?.success) {
    return <p className="text-center text-red-500">Invalid data</p>;
  }

  const { sport, matches } = data.data;


  const sortedMatches = matches?.sort((a: any, b: any) => {
    const numA = parseInt(a.id.replace(/\D/g, ""), 10);
    const numB = parseInt(b.id.replace(/\D/g, ""), 10);

    return numA - numB;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{sport.name}</h1>
        <p className="text-gray-600">
          Browse through the matches and events under {sport.name}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button className='flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200' onClick={() => window.location.href = `/sport`}>
            <Trophy size={20} />
            Back to Sports
          </button>
          <button className='flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200' onClick={() => window.location.href = `/`}>
            <Home size={20} />
            Home
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="max-w-4xl mx-auto">
        {sortedMatches?.map((match: any) => (
          <div
            key={match.id}
            onClick={() => router.push(`/sport/${slug}/${match.id}`)}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer mb-6"
          >
            <div className="p-6">
              <span className="text-gray-500">{match.id} | {match.type.toUpperCase()}</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {match.matchName}
              </h3>

              {/* Participants */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600">Participants:</p>
                <ul className="space-y-2">
                  {match.participants.map((participant: any) => (
                    <li
                      key={participant.id}
                      className="text-sm text-gray-700 flex items-center"
                    >
                      <span className="font-bold text-indigo-600">
                        {participant.team.name}
                      </span>
                      {participant.score !== undefined && (
                        <span className="ml-2 text-blue-500">
                          (Score: {participant.score})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location and Date */}
              <p className="text-sm text-gray-700">
                📍 Location: {match.location || 'Not specified'}
              </p>
              <p className="text-sm text-gray-700">
                🕐 Date Time:{' '}
                {formatDateRange(match.date)}
              </p>
            </div>
            <div
              className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform origin-left transition-transform duration-300`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
