/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node
} from 'reactflow'
import 'reactflow/dist/style.css'
import { teamLists } from '@/mock/teams'
import Brucket from './brucket-match'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import LabelNode from './label-node'
import { on } from 'events';

// Define custom node types
const nodeTypes = { brucket: Brucket, label: LabelNode }

interface NodeData {
  team1: string | null
  team2: string | null
  winner: string | null
  matchName: string | null
  score1: number | null
  score2: number | null
  location?: string | null
  dateTime?: string | null
  onTeamDrop: (team: string, target: 'team1' | 'team2') => void
  onDeleteTeam: (nodeId: string, target: 'team1' | 'team2') => void
  onUpdateTeamName: (
    nodeId: string,
    team: 'team1' | 'team2',
    name: string
  ) => void
  onUpdateScore: (
    nodeId: string,
    team: 'team1' | 'team2',
    score: number
  ) => void
  onUpdateMatchName: (nodeId: string, name: string) => void,
  onChangeLabel: (newLabel: string) => void
  onUpdateWinner: (nodeId: string, winner: string | null) => void
  onUpdateLocation?: (nodeId: string, location: string) => void
  onUpdateDateTime?: (nodeId: string, dateTime: string) => void
}

const Page: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [idCounter, setIdCounter] = useState<number>(1)
  const [selectedSport, setSelectedSport] = useState('IF-Games')
  const [gridSize, setGridSize] = useState<number>(10)

  // Update team name
  const updateTeamName = (
    nodeId: string,
    team: 'team1' | 'team2',
    name: string
  ) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [team]: name } }
          : node
      )
    )
  }

  // Update score
  const updateScore = (
    nodeId: string,
    team: 'team1' | 'team2',
    score: number
  ) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                [`score${team === 'team1' ? 1 : 2}`]: score
              }
            }
          : node
      )
    )
  }

  // Update match name
  const updateMatchName = (nodeId: string, name: string) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, matchName: name } }
          : node
      )
    )
  }

  // Delete team
  const deleteTeam = (nodeId: string, target: 'team1' | 'team2') => {
    setNodes(nds =>
      nds.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [target]: null } }
          : node
      )
    )
  }

  const updateWinner = (nodeId: string, winner: string | null) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === nodeId ? { ...node, data: { ...node.data, winner } } : node
      )
    )
  }

  // Add a new match node
  const addMatchNode = () => {
    const onTeamDrop = (
      team: string,
      target: 'team1' | 'team2',
      nodeId: string
    ) => {
      setNodes(nds =>
        nds.map(node =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, [target]: team } }
            : node
        )
      )
    }

    const newNode: Node<NodeData> = {
      id: `${idCounter}`,
      type: 'brucket',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        team1: null,
        team2: null,
        matchName: `Match ${idCounter}`,
        winner: null,
        score1: null,
        score2: null,
        location: null,
        dateTime: null,
        onTeamDrop: (team, target) => onTeamDrop(team, target, `${idCounter}`),
        onDeleteTeam: deleteTeam,
        onUpdateTeamName: updateTeamName,
        onUpdateScore: updateScore,
        onUpdateMatchName: updateMatchName,
        onUpdateWinner: updateWinner,
        onChangeLabel: () => {},
        onUpdateLocation: updateLocation,
        onUpdateDateTime: updateDateTime,
      }
    }

    setNodes(nds => [...nds, newNode as any])
    setIdCounter(id => id + 1)
  }

  // Update label text
  const updateLabel = (nodeId: string, label: string) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === nodeId ? { ...node, data: { ...node.data, label } } : node
      )
    )
  }

  // Add a new label node
  const addLabelNode = () => {
    const newNode: Node = {
      id: `label-${idCounter}`,
      type: 'label',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: `Label ${idCounter}`,
        onChangeLabel: (newLabel: string) =>
          updateLabel(`label-${idCounter}`, newLabel)
      }
    }

    setNodes(nds => [...nds, newNode])
    setIdCounter(id => id + 1)
  }

  const updateLocation = (nodeId: string, location: string) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === nodeId ? { ...node, data: { ...node.data, location } } : node
      )
    )
  }

  const updateDateTime = (nodeId: string, dateTime: string) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === nodeId ? { ...node, data: { ...node.data, dateTime } } : node
      )
    )
  }

  // Save current flow to JSON
  const saveToJSON = () => {
    const data = { nodes, edges }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const date = new Date().toISOString().replace(/[-:.]/g, '').replace('T', '-').split('.')[0]
    link.href = url
    link.download = `match-${selectedSport}-${date}.json`
    link.click()
  }

  // Load flow from JSON and reattach handlers
  const loadFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (Array.isArray(data.nodes) && Array.isArray(data.edges)) {
            const loadedNodes = data.nodes.map((node: Node<NodeData>) => ({
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
                onUpdateLocation: updateLocation,
                onUpdateDateTime: updateDateTime,
              },
            }));
  
            setNodes(loadedNodes);
            setEdges(data.edges);
            setIdCounter(loadedNodes.length + 1); // Adjust the counter
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
  const onConnect = (connection: Connection) =>
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          animated: true,
          style: { strokeDasharray: '5,5', strokeWidth: 2, stroke: '#555' },
        },
        eds
      )
    );
  
  // Get teams for the selected sport
  const getTeams = () => {
    const sportData = teamLists.find(sport => sport.sport === selectedSport)
    return sportData ? sportData.team : []
  }

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10)
    if (!isNaN(size) && size > 0) {
      setGridSize(size)
    }
  }

  return (
    <div className="h-screen bg-gray-200 flex flex-col">
      {/* Top Controls */}
      <div
        style={{ padding: '1rem', backgroundColor: '#1e293b', color: 'white' }}
      >
        <button
          onClick={addMatchNode}
          className='bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded'
        >
          Add Match
        </button>
        <button
          onClick={addLabelNode}
          className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded ml-2'
        >
          Add Label
        </button>

        <label htmlFor='grid-size' className='mr-2'>
          Grid Size:
        </label>
        <input
          id='grid-size'
          type='number'
          min='10'
          value={gridSize}
          onChange={handleGridSizeChange}
          className='text-black px-2 py-1 rounded'
          style={{ width: '60px' }}
        />
        <span className='ml-2'>px</span>

        <button
          onClick={saveToJSON}
          className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded ml-2'
        >
          Save as JSON
        </button>
        <input
          type='file'
          accept='application/json'
          onChange={loadFromJSON}
          className='ml-2 text-white'
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
          snapToGrid={true}
          snapGrid={[gridSize, gridSize]}
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
          overflowX: 'auto'
        }}
      >
        <h2 className='flex text-white font-bold'>
          Drag Teams Here&nbsp;{' '}
          <p className='text-blue-200'>{`${selectedSport}`}</p>
        </h2>
        <Tabs>
          <TabsList>
            {teamLists.map(sport => (
              <TabsTrigger
                value={sport.sport}
                key={sport.sport}
                onClick={() => setSelectedSport(sport.sport)}
              >
                {sport.sport}
              </TabsTrigger>
            ))}
          </TabsList>
          {teamLists.map((sport) => (
          <TabsContent key={sport.sport} value={sport.sport}>
            <div className='overflow-x-auto flex gap-4 py-4'>
              {getTeams().map((team) => (
                <div
                  key={team.name}
                  className='bg-white p-2 rounded cursor-grab min-w-fit'
                  draggable
                  onDragStart={event => {
                    event.dataTransfer.setData('team', team.name)
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      const dragEvent = new DragEvent('dragstart', {
                        dataTransfer: new DataTransfer()
                      });
                      dragEvent.dataTransfer?.setData('team', team.name);
                      event.currentTarget.dispatchEvent(dragEvent);
                    }
                  }}
                >
                  <p className='text-center font-bold'>{team.name}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default Page
