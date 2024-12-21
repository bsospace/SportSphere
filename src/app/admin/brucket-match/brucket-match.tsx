import { Handle, Position } from "reactflow";
import React from "react";

interface BrucketProps {
  id: string;
  data: {
    matchName: string | null; // Match name
    team1: string | null;
    team2: string | null;
    score1: number | null;
    score2: number | null;
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
    onUpdateMatchName?: (nodeId: string, name: string) => void; // Function to update match name
  };
}

const Brucket: React.FC<BrucketProps> = ({ id, data }) => {
  const {
    matchName,
    team1,
    team2,
    score1,
    score2,
    onTeamDrop,
    onDeleteTeam,
    onUpdateTeamName,
    onUpdateScore,
    onUpdateMatchName,
  } = data;

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    target: "team1" | "team2"
  ) => {
    event.preventDefault();
    const team = event.dataTransfer.getData("team");
    if (team && onTeamDrop) {
      onTeamDrop(team, target);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 w-full max-w-md mx-auto">
      <Handle
        position={Position.Right}
        type="source"
        className="handle bg-gray-400 w-4 h-4"
      />
      <Handle
        position={Position.Left}
        type="target"
        className="handle bg-gray-400 w-4 h-4"
      />

      {/* Match Name */}
      <div className="text-center text-base font-medium mb-4 text-gray-700">
        <input
          type="text"
          value={matchName ?? ""}
          placeholder="Match Name"
          className="w-full bg-transparent text-center font-semibold focus:outline-none"
          onChange={(e) =>
            onUpdateMatchName && onUpdateMatchName(id, e.target.value)
          }
        />
      </div>

      {/* Team 1 */}
      <div
        className="flex justify-between items-center py-2 px-4 bg-gray-100 border border-gray-300 rounded-md mb-2"
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, "team1")}
      >
        {team1 ? (
          <>
            <span className="text-gray-700 font-medium flex-1">
              {team1 || "Team 1"}
            </span>
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
            <button
              className="text-red-500 font-bold ml-2 hover:text-red-700"
              onClick={() => onDeleteTeam && onDeleteTeam(id, "team1")}
            >
              ❌
            </button>
          </>
        ) : (
          <input
            type="text"
            placeholder="Enter team name"
            className="w-full bg-gray-200 rounded px-3 py-1 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) =>
              onUpdateTeamName &&
              onUpdateTeamName(id, "team1", e.target.value)
            }
          />
        )}
      </div>

      {/* Team 2 */}
      <div
        className="flex justify-between items-center py-2 px-4 bg-gray-100 border border-gray-300 rounded-md"
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, "team2")}
      >
        {team2 ? (
          <>
            <span className="text-gray-700 font-medium flex-1">
              {team2 || "Team 2"}
            </span>
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
            <button
              className="text-red-500 font-bold ml-2 hover:text-red-700"
              onClick={() => onDeleteTeam && onDeleteTeam(id, "team2")}
            >
              ❌
            </button>
          </>
        ) : (
          <input
            type="text"
            placeholder="Enter team name"
            className="w-full bg-gray-200 rounded px-3 py-1 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) =>
              onUpdateTeamName &&
              onUpdateTeamName(id, "team2", e.target.value)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Brucket;
