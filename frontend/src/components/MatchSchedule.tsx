import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateRange } from "@/app/utils/formatdate-range.util";
import { Match, MatchParticipant } from "@/app/utils/interfaces";
import { Trophy, MapPin, Clock } from "lucide-react";

interface MatchScheduleProps {
    matches: Match[];
}

const MatchSchedule: React.FC<MatchScheduleProps> = ({ matches }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const getBadgeText = (rank: string | undefined, matchType: string | null) => {
        if (!rank) return null;

        if (matchType?.toUpperCase() == "DUEL") {
            switch (rank) {
                case "1":
                    return "Winner 🏆";
                case "2":
                    return "Loser ❌";
                case "3":
                    return "Draw ⚖️";
                default:
                    return `Rank ${rank}`;
            }
        } else if (matchType == "free-for-all") {
            switch (rank) {
                case "1":
                    return "1st Place 🥇";
                case "2":
                    return "2nd Place 🥈";
                case "3":
                    return "3rd Place 🥉";
                default:
                    return `${rank}th Place`;
            }
        }
        return null;
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">
            {isLoading ? (
                // Skeleton Loading
                Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="mb-6 pb-6 border-b border-gray-200 last:border-none"
                    >
                        <div className="space-y-3">
                            <Skeleton className="w-32 h-4" />
                            <Skeleton className="w-64 h-6" />
                            <Skeleton className="w-40 h-4" />
                        </div>
                        <div className="mt-4 space-y-3">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))}
                        </div>
                    </div>
                ))
            ) : matches.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <Trophy className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="text-xl font-semibold">No matches scheduled</p>
                </div>
            ) : (
                matches.map((match, index) => (
                    <div
                        key={match.id}
                        className="bg-white shadow-sm rounded-lg border border-gray-100 mb-6 overflow-hidden"
                    >
                        {/* Match Header */}
                        <div className="bg-gray-50 p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <span>แมชท์ที่ {index + 1}</span>
                                        {match?.completed !== null && (
                                            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                                                จบแล้ว
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                        <Clock size={16} className="text-gray-400" />
                                        {formatDateRange(match.date)}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <MapPin size={16} className="text-gray-400" />
                                    {match.location ?? "Location not specified"}
                                </p>
                            </div>
                            <h4 className="mt-2 text-xl font-semibold text-gray-900">
                                {match.matchName}
                            </h4>
                        </div>

                        {/* Participants */}
                        <div className="p-4 space-y-3">
                            {(
                                match.type === "free-for-all"
                                    ? match.participants
                                        .slice()
                                        .sort((a, b) => {
                                            if (a.rank == null && b.rank == null) return 0;
                                            if (a.rank == null) return 1;
                                            if (b.rank == null) return -1;
                                            return parseInt(a.rank, 10) - parseInt(b.rank, 10);
                                        })
                                    : match.participants
                            ).map((participant: MatchParticipant) => (
                                <div
                                    key={participant.id}
                                    className="flex items-center justify-between bg-gray-100/50 hover:bg-gray-100 transition-colors p-3 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-800">
                                            {participant.team?.name}
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold text-gray-700">
                                        {participant.score != null ? participant.score : 
                                            Array.isArray(participant.setScores)
                                                ? participant.setScores.map((set, index) => (
                                                    set.score !== 0 && ( // ตรวจสอบว่า set.score ไม่เป็น 0
                                                        <span
                                                            key={index}
                                                            className="inline-block bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold sm:px-3 sm:py-1 max-sm:text-[10px] max-sm:px-2 max-sm:py-0.5"
                                                        >
                                                            {set.label}: {set.score}
                                                        </span>
                                                    )
                                                ))
                                                : JSON.parse(participant.setScores || "[]").map((set, index) => (
                                                    set.score !== 0 && ( // ตรวจสอบว่า set.score ไม่เป็น 0
                                                        <span
                                                            key={index}
                                                            className="inline-block bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold sm:px-3 sm:py-1 max-sm:text-[10px] max-sm:px-2 max-sm:py-0.5"
                                                        >
                                                            {set.label}: {set.score}
                                                        </span>
                                                    )
                                                ))
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MatchSchedule;