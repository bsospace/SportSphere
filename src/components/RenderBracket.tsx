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
  };
}

const BracketDisplay: React.FC<BracketProps> = ({ id, data }) => {
  const { matchName, team1, team2, score1, score2, winner } = data;

  const isWinner = (team: string | null) => {
    return team === winner;
  };

  return (
    <div className="relative w-80 border-2 rounded-lg shadow-md">
      <Handle
        position={Position.Right}
        type="source"
        className="handle"
      />
      <Handle
        position={Position.Left}
        type="target"
        className="handle"
      />
      
      <div className="overflow-hidden rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="">
              <th
                colSpan={3}
                className="py-4 px-6 text-center text-lg font-bold text-black shadow-sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6" />
                  <span>{matchName ?? 'TBD'}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Team 1 Row */}
            <tr className={`transition-all duration-300 ${
              isWinner(team1) 
                ? '' 
                : 'hover:bg-gray-50'
            }`}>
              <td className="py-6 px-6 flex items-center gap-3">
                {isWinner(team1) && (
                  <Crown className="text-yellow-500 w-6 h-6 animate-bounce" />
                )}
                <span className={`text-gray-700 font-semibold flex-1 ${
                  isWinner(team1) ? 'text-gray-700' : ''
                }`}>
                  {team1 ?? 'TBD'}
                </span>
              </td>
              <td className="py-6 px-6 text-center border-l-2 border-gray-100">
                <span className={`text-lg font-bold ${
                  isWinner(team1) ? 'text-yellow-500' : 'text-gray-600'
                }`}>
                  {score1 ?? '--'}
                </span>
              </td>
            </tr>

            {/* Separator */}
            <tr>
              <td colSpan={3} className="border-t-2 border-gray-100"></td>
            </tr>

            {/* Team 2 Row */}
            <tr className={`transition-all duration-300 ${
              isWinner(team2) 
                ? '' 
                : 'hover:bg-gray-50'
            }`}>
              <td className="py-6 px-6 flex items-center gap-3">
                {isWinner(team2) && (
                  <Crown className="text-yellow-500 w-6 h-6 animate-bounce" />
                )}
                <span className={`text-gray-700 font-semibold flex-1 ${
                  isWinner(team2) ? 'text-gray-800' : ''
                }`}>
                  {team2 ?? 'TBD'}
                </span>
              </td>
              <td className="py-6 px-6 text-center border-l-2 border-gray-100">
                <span className={`text-lg font-bold ${
                  isWinner(team2) ? 'text-yellow-500' : 'text-gray-600'
                }`}>
                  {score2 ?? '--'}
                </span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td colSpan={3} className="py-4 px-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-black font-bold text-lg">
                    Winner: {winner ?? 'Waiting'}
                  </span>
                  {winner && (
                    <Trophy className="text-yellow-500 w-6 h-6" />
                  )}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BracketDisplay;