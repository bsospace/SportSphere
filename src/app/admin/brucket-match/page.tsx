// @ts-nocheck
'use client';

import React, { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { teamLists } from '@/mock/teams';
import Brucket from './brucket-match';

// Define custom node types
const nodeTypes = { brucket: Brucket };

interface NodeData {
  team1: string | null;
  team2: string | null;
  winner: string | null;
  onTeamDrop: (team: string, target: 'team1' | 'team2') => void;
  onDeleteTeam: (nodeId: string, target: 'team1' | 'team2') => void;
  onUpdateTeamName: (nodeId: string, team: 'team1' | 'team2', name: string) => void;
  onUpdateScore: (nodeId: string, team: 'team1' | 'team2', score: number) => void;
  onUpdateMatchName: (nodeId: string, name: string) => void;
}

const Page: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [idCounter, setIdCounter] = useState<number>(1);

  // Update team name
  const updateTeamName = (nodeId: string, team: 'team1' | 'team2', name: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [team]: name } }
          : node
      )
    );
  };

  // Update score
  const updateScore = (nodeId: string, team: 'team1' | 'team2', score: number) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [`score${team === 'team1' ? 1 : 2}`]: score } }
          : node
      )
    );
  };

  // Update match name
  const updateMatchName = (nodeId: string, name: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, matchName: name } }
          : node
      )
    );
  };

  // Delete team
  const deleteTeam = (nodeId: string, target: 'team1' | 'team2') => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [target]: null } }
          : node
      )
    );
  };

  const updateWinner = (nodeId: string, winner: string | null) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, winner } }
          : node
      )
    );
  }

  // Add a new match node
  const addMatchNode = () => {
    const onTeamDrop = (team: string, target: 'team1' | 'team2', nodeId: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, [target]: team } }
            : node
        )
      );
    };

    const newNode: Node<NodeData> = {
      id: `${idCounter}`,
      type: 'brucket',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        team1: null,
        team2: null,
        matchName: `Match ${idCounter}`,
        winner: null,
        onTeamDrop: (team, target) => onTeamDrop(team, target, `${idCounter}`),
        onDeleteTeam: deleteTeam,
        onUpdateTeamName: updateTeamName,
        onUpdateScore: updateScore,
        onUpdateMatchName: updateMatchName,
        onUpdateWinner: updateWinner,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setIdCounter((id) => id + 1);
  };

  // Save current flow to JSON
  const saveToJSON = () => {
    const data = { nodes, edges };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flow-data.json';
    link.click();
  };

  // Load flow from JSON and reattach handlers
  const loadFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (Array.isArray(data.nodes) && Array.isArray(data.edges)) {
            const loadedNodes = data.nodes.map((node) => ({
              ...node,
              data: {
                ...node.data,
                onTeamDrop: (team: string, target: 'team1' | 'team2') =>
                  setNodes((nds) =>
                    nds.map((n) =>
                      n.id === node.id
                        ? { ...n, data: { ...n.data, [target]: team } }
                        : n
                    )
                  ),
                onDeleteTeam: deleteTeam,
                onUpdateTeamName: updateTeamName,
                onUpdateScore: updateScore,
                onUpdateMatchName: updateMatchName,
                onUpdateWinner: updateWinner,
              },
            }));

            setNodes(loadedNodes);
            setEdges(data.edges);
            setIdCounter(data.nodes.length + 1);
          } else {
            alert('Invalid JSON structure!');
          }
        } catch (error) {
          console.error('Failed to load JSON:', error);
          alert('Failed to load JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle connections
  const onConnect = (connection: Connection) => setEdges((eds) => addEdge(connection, eds));

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#f4f4f4',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Controls */}
      <div
        style={{ padding: '1rem', backgroundColor: '#1e293b', color: 'white' }}
      >
        <button
          onClick={addMatchNode}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
        >
          Add Match
        </button>
        <button
          onClick={saveToJSON}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Save as JSON
        </button>
        <input
          type="file"
          accept="application/json"
          onChange={loadFromJSON}
          className="ml-2 text-white"
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* ReactFlow Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* Draggable Teams */}
      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '1rem',
          overflowX: 'auto',
        }}
      >
        <div className="flex space-x-4">
          {teamLists.map((team, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData('team', team.name);
              }}
            >
              <p className="text-center font-bold">{team.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
