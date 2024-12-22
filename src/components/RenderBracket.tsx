/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Handle, Position } from 'reactflow';
import { Crown, Trophy } from 'lucide-react';

interface BracketProps {
  id: string;
  data: {
    matchName: string | null;
    team1: string | null;
    team2: string | null;
    score1: number | null;
    score2: number | null;
    winner: string | null;
    location?: string | null;
    dateTime?: string | null;
  };
}

const BracketDisplay: React.FC<BracketProps> = ({ data }) => {
  const { matchName, team1, team2, score1, score2, winner, location, dateTime } = data;

  const isWinner = (team: string | null) => team === winner;

  return (
    <div className="relative w-64 border-2 rounded-md shadow-md">
      <Handle position={Position.Right} type="source" className="handle" />
      <Handle position={Position.Left} type="target" className="handle" />
      <div className="overflow-hidden rounded-md">
        <table className="w-full border-collapse bg-white text-sm">
          <thead>
            <tr>
              <th
                colSpan={3}
                className="py-2 px-4 text-center text-md font-bold text-black shadow-sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5" />
                  <span className="truncate">{matchName ?? 'TBD'}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Team 1 Row */}
            <tr
              className={`transition-all duration-300 ${
                isWinner(team1) ? '' : 'hover:bg-gray-50'
              }`}
            >
              <td className="py-3 px-4 flex items-center gap-2">
                {isWinner(team1) && (
                  <Crown className="text-yellow-500 w-5 h-5 animate-bounce" />
                )}
                <span
                  className={`truncate text-gray-700 font-semibold flex-1 ${
                    isWinner(team1) ? 'text-gray-800' : ''
                  }`}
                  title={team1 ?? 'TBD'}
                >
                  {team1 ?? 'TBD'}
                </span>
              </td>
              <td className="py-3 px-4 text-center border-l-2 border-gray-100">
                <span
                  className={`text-sm font-bold ${
                    isWinner(team1) ? 'text-yellow-500' : 'text-gray-600'
                  }`}
                >
                  {score1 ?? '--'}
                </span>
              </td>
            </tr>

            {/* Separator */}
            <tr>
              <td colSpan={3} className="border-t-2 border-gray-100"></td>
            </tr>

            {/* Team 2 Row */}
            <tr
              className={`transition-all duration-300 ${
                isWinner(team2) ? '' : 'hover:bg-gray-50'
              }`}
            >
              <td className="py-3 px-4 flex items-center gap-2">
                {isWinner(team2) && (
                  <Crown className="text-yellow-500 w-5 h-5 animate-bounce" />
                )}
                <span
                  className={`truncate text-gray-700 font-semibold flex-1 ${
                    isWinner(team2) ? 'text-gray-800' : ''
                  }`}
                  title={team2 ?? 'TBD'}
                >
                  {team2 ?? 'TBD'}
                </span>
              </td>
              <td className="py-3 px-4 text-center border-l-2 border-gray-100">
                <span
                  className={`text-sm font-bold ${
                    isWinner(team2) ? 'text-yellow-500' : 'text-gray-600'
                  }`}
                >
                  {score2 ?? '--'}
                </span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td colSpan={3} className="py-2 px-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-black font-bold text-sm">
                    Winner: {winner ?? 'Waiting'}
                  </span>
                  {winner && <Trophy className="text-yellow-500 w-5 h-5" />}
                </div>
              </td>
            </tr>
            {/* Location */}
            {location && (
              <tr className="bg-gray-50">
                <td colSpan={3} className="py-2 px-4 text-center">
                  <span className="text-gray-600 font-medium text-xs">
                    Location: {location}
                  </span>
                </td>
              </tr>
            )}
            {/* Date & Time */}
            {dateTime && (
              <tr className="bg-gray-50">
                <td colSpan={3} className="py-2 px-4 text-center">
                  <span className="text-gray-600 font-medium text-xs">
                    Date & Time: {new Date(dateTime).toLocaleString()}
                  </span>
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BracketDisplay;
