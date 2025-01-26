import React from "react";

const Podium = ({ teams }) => {
    const getBackgroundColor = (rank) => {
        switch (rank) {
        case 1:
            return "bg-yellow-400";
        case 2:
            return "bg-gray-400";
        case 3:
            return "bg-red-400";
        case 4:
            return "bg-blue-400";
        case 5:
            return "bg-green-400";
        default:
            return "bg-teal-400";
        }
    };

    const getPodiumSize = (rank) => {
        switch (rank) {
        case 1:
            return "w-32 h-32 md:w-48 md:h-48";
        case 2:
        case 3:
            return "w-28 h-28 md:w-36 md:h-36";
        default:
            return "w-24 h-24 md:w-32 md:h-32";
        }
    };

    return (
        <div className="flex flex-col items-center">
        {/* Linear Podium Layout */}
        <div className="flex flex-wrap justify-center items-end gap-4 sm:gap-6 mt-6">
            {teams.map((team) => (
            <div key={team.rank} className="flex flex-col items-center">
                {/* Rank */}
                <p className="text-sm sm:text-lg font-bold">
                {team.rank === 1
                    ? "1st Place 🥇"
                    : team.rank === 2
                    ? "2nd Place 🥈"
                    : team.rank === 3
                    ? "3rd Place 🥉"
                    : `${team.rank}th Place`}
                </p>
                {/* Podium Circle */}
                <div
                className={`${team.color || getBackgroundColor(
                    team.rank
                )} ${getPodiumSize(
                    team.rank
                )} rounded-full flex items-center justify-center text-center text-xs sm:text-sm font-bold`}
                >
                {team.team}
                </div>
                {/* Score */}
                <div
                className="bg-gray-200 w-16 h-10 sm:w-20 sm:h-16 flex items-center justify-center mt-2 text-sm sm:text-lg font-bold"
                >
                {team.score}
                </div>
                {/* Title */}
                <p className="mt-2 text-sm sm:text-lg">{team.title}</p>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Podium;
