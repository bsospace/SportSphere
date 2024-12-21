"use client";

import { Handle, Position } from "reactflow";
import React from "react";

interface BrucketProps {
  id: string;
  data: {
    matchName: string | null;
    team1: string | null;
    team2: string | null;
    score1: number | null;
    score2: number | null;
    winner: string | null;
    onTeamDrop?: (team: string, target: "team1" | "team2") => void;
    onDeleteTeam?: (nodeId: string, target: "team1" | "team2") => void;
    onUpdateTeamName?: (
      nodeId: string,
      team: "team1" | "team2",
      name: string
    ) => void;
    onUpdateScore?: (
      nodeId: string,
      team: "team1" | "team2",
      score: number
    ) => void;
    onUpdateMatchName?: (nodeId: string, name: string) => void;
    onUpdateWinner?: (nodeId: string, winner: string | null) => void;
  };
}

const Brucket: React.FC<BrucketProps> = ({ id, data }) => {
  const {
    matchName,
    team1,
    team2,
    score1,
    score2,
    winner,
    onTeamDrop,
    onDeleteTeam,
    onUpdateTeamName,
    onUpdateScore,
    onUpdateMatchName,
    onUpdateWinner,
  } = data;

  const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLTableRowElement>,
    target: "team1" | "team2"
  ) => {
    event.preventDefault();
    const team = event.dataTransfer.getData("team");
    if (team && onTeamDrop) {
      onTeamDrop(team, target);
    }
  };

  return (
    <div className="bg-white p-1 rounded-lg shadow-md w-[16rem] max-w-sm text-xs">
      {/* Handles for ReactFlow connections */}
      <Handle
        position={Position.Right}
        type="source"
        className="handle bg-gray-400 w-2.5 h-2.5"
      />
      <Handle
        position={Position.Left}
        type="target"
        className="handle bg-gray-400 w-2.5 h-2.5"
      />

      {/* Match Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-md">
          {/* Match Name */}
          <thead>
            <tr className="bg-gray-100">
              <th
                colSpan={3}
                className="py-1 px-2 text-center font-medium text-gray-700"
              >
                <input
                  type="text"
                  value={matchName ?? ""}
                  placeholder="Match Name"
                  className="w-full bg-transparent text-center font-medium focus:outline-none"
                  onChange={(e) =>
                    onUpdateMatchName && onUpdateMatchName(id, e.target.value)
                  }
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Team 1 Row */}
            <tr
              className="hover:bg-gray-200"
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, "team1")}
            >
              <td className="py-1 px-2">
                {team1 ? (
                  <span className="text-gray-700 font-medium">{team1}</span>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter team name"
                    className="w-full bg-gray-200 rounded px-1 py-0.5 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    onChange={(e) =>
                      onUpdateTeamName &&
                      onUpdateTeamName(id, "team1", e.target.value)
                    }
                  />
                )}
              </td>
              <td className="py-1 px-2 text-center border-x border-gray-300">
                <input
                  type="number"
                  value={score1 ?? ""}
                  placeholder="--"
                  className="w-10 bg-transparent text-center border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                  onChange={(e) =>
                    onUpdateScore &&
                    onUpdateScore(id, "team1", Number(e.target.value))
                  }
                />
              </td>
              <td className="py-1 px-2 text-center">
                <button
                  className="text-red-500 font-bold hover:text-red-700"
                  onClick={() => onDeleteTeam && onDeleteTeam(id, "team1")}
                >
                  ❌
                </button>
              </td>
            </tr>

            {/* Team 2 Row */}
            <tr
              className="hover:bg-gray-200"
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, "team2")}
            >
              <td className="py-1 px-2">
                {team2 ? (
                  <span className="text-gray-700 font-medium">{team2}</span>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter team name"
                    className="w-full bg-gray-200 rounded px-1 py-0.5 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    onChange={(e) =>
                      onUpdateTeamName &&
                      onUpdateTeamName(id, "team2", e.target.value)
                    }
                  />
                )}
              </td>
              <td className="py-1 px-2 text-center border-x border-gray-300">
                <input
                  type="number"
                  value={score2 ?? ""}
                  placeholder="--"
                  className="w-10 bg-transparent text-center border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                  onChange={(e) =>
                    onUpdateScore &&
                    onUpdateScore(id, "team2", Number(e.target.value))
                  }
                />
              </td>
              <td className="py-1 px-2 text-center">
                <button
                  className="text-red-500 font-bold hover:text-red-700"
                  onClick={() => onDeleteTeam && onDeleteTeam(id, "team2")}
                >
                  ❌
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td colSpan={4} className="py-1 px-2 text-center">
                <label htmlFor={`winner-select-${id}`} className="mr-2">
                  Winner:
                </label>
                <select
                  id={`winner-select-${id}`}
                  value={winner ?? ""}
                  onChange={(e) =>
                    onUpdateWinner && onUpdateWinner(id, e.target.value)
                  }
                  className="border border-gray-300 rounded px-1 py-0.5"
                >
                  <option value="Waiting">Waiting</option>
                  <option value="TBD">TBD</option>
                  {team1 && <option value={team1}>{team1}</option>}
                  {team2 && <option value={team2}>{team2}</option>}
                </select>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Brucket;
