import React from "react";
import { Trophy, Crown, Star, Medal } from "lucide-react";
import { motion } from "framer-motion"; // Import Framer Motion

const Podium = ({ teams, isLoading }) => {
    const rankCounts = teams.reduce((acc, team) => {
        acc[team.rank] = (acc[team.rank] || 0) + 1;
        return acc;
    }, {});

    const getBackgroundColor = (rank) => {
        switch (rank) {
            case 1: return "bg-gradient-to-br from-yellow-300 to-yellow-500";
            case 2: return "bg-gradient-to-br from-gray-300 to-gray-500";
            case 3: return "bg-gradient-to-br from-orange-300 to-orange-500";
            case 4: return "bg-gradient-to-br from-blue-300 to-blue-500";
            case 5: return "bg-gradient-to-br from-green-300 to-green-500";
            default: return "bg-gradient-to-br from-teal-300 to-teal-500";
        }
    };

    const getPodiumSize = (rank) => {
        switch (rank) {
            case 1: return "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52";
            case 2:
            case 3: return "w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40";
            default: return "w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36";
        }
    };

    const getRankText = (rank) => {
        const rankSuffix = ["", "ที่ 1", "ที่ 2", "ที่ 3"];
        const suffix = rankSuffix[rank] || `ที่ ${rank}`;

        return rankCounts[rank] > 1 ? `อันดับร่วม${suffix}` : `อันดับ${suffix}`;
    };

    const getRankIcon = (rank) => {
        const iconSize = "w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8";
        switch (rank) {
            case 1: return <Crown className={`${iconSize} text-yellow-600`} />;
            case 2: return <Trophy className={`${iconSize} text-gray-600`} />;
            case 3: return <Medal className={`${iconSize} text-orange-600`} />;
            default: return <Star className={`${iconSize} text-blue-600`} />;
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="mb-4 flex flex-col items-center py-2 sm:py-4 md:py-8 rounded-xl">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Leaderboard
                </h2>

                {/* Skeleton Loader */}
                {isLoading ? (
                    <div className="flex flex-row flex-nowrap overflow-x-auto md:overflow-hidden sm:flex-wrap justify-start sm:justify-center items-end gap-3 sm:gap-6 md:gap-8 lg:gap-10 w-full">
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <div key={index} className="flex flex-col items-center animate-pulse">
                                {/* Rank Icon Placeholder */}
                                <div className="mb-2 bg-gray-300 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full"></div>

                                {/* Rank Text Placeholder */}
                                <div className="bg-gray-300 h-4 w-16 sm:w-24 md:w-32 mb-2 rounded"></div>

                                {/* Podium Circle Placeholder */}
                                <div className={`bg-gray-300 ${getPodiumSize(index + 1)} rounded-full`}></div>

                                {/* Score Box Placeholder */}
                                <div className="bg-gray-300 w-14 h-10 sm:w-20 sm:h-16 md:w-24 md:h-20 mt-2 sm:mt-4 rounded-lg"></div>

                                {/* Title Placeholder */}
                                <div className="bg-gray-300 h-4 w-24 sm:w-32 md:w-40 mt-2 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-row flex-nowrap overflow-x-auto md:overflow-hidden sm:flex-wrap justify-start sm:justify-center items-end gap-3 sm:gap-6 md:gap-8 lg:gap-10 w-full">
                        {teams.map((team, index) => (
                            <motion.div
                                key={team.rank}
                                className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300 flex-shrink-0 w-auto px-2 sm:px-0"
                                initial={{ opacity: 0, y: 30 }} // Start slightly lower
                                animate={{ opacity: 1, y: 0 }} // Move to original position
                                transition={{ duration: 0.5, delay: index * 0.15 }} // Stagger effect
                            >
                                {/* Rank Icon */}
                                <div className="mb-1 sm:mb-2">{getRankIcon(team.rank)}</div>

                                {/* Rank Text */}
                                <p className="text-xs sm:text-base md:text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 text-center whitespace-nowrap">
                                    {getRankText(team.rank)}
                                </p>

                                {/* Podium Circle */}
                                <div className={` ${team.color || getBackgroundColor(team.rank)} ${getPodiumSize(team.rank)} rounded-full flex items-center justify-center text-center text-xs sm:text-base md:text-lg font-bold shadow-lg border-2 sm:border-4 border-white text-white p-2 sm:p-4 transform hover:rotate-3 transition-transform duration-300 my-2 sm:my-3`}>
                                    <div className="break-words max-w-full px-1">{team.team}</div>
                                </div>

                                {/* Score Box */}
                                <div className="bg-white bg-opacity-90 backdrop-blur-sm 
    w-12 h-8 sm:w-16 sm:h-12 md:w-20 md:h-16 
    flex items-center justify-center mt-1 sm:mt-3 
    text-[10px] sm:text-xs md:text-sm font-bold 
    rounded-md shadow-md border border-gray-200 text-gray-800">
    {team.score} pts
</div>


                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Podium;
