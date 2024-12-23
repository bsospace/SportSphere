/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import ReactFlow, { Background, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import BrucketDisplay from '@/components/RenderBracket'
import LabelNode from '@/app/admin/brucket-match/label-node'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Define the node type for the brackets
const nodeTypes = { brucket: BrucketDisplay,label: LabelNode }

const RenderBracket: React.FC = () => {

    const router = useRouter()
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch sport type from query parameters
  const sport =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('sport') || 'rov'
      : 'rov'

  useEffect(() => {
    const fetchBracketData = async () => {
      try {
        const response = await fetch(`/assets/data/rov.json`)
        if (!response.ok) throw new Error(`Failed to load rov.json`)
        const data = await response.json()

        setNodes(data.nodes || [])
        setEdges(data.edges || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBracketData()
  }, [sport])

  if (loading) {
    return <div className='text-center text-gray-500'>Loading...</div>
  }

  if (error) {
    return <div className='text-center text-red-500'>{error}</div>
  }

  return (
    <>
    <div className='absolute top-10 left-0 right-0 z-10'>
        <div className="flex lg:w-[90%] w-full lg:justify-center items-center mx-auto">
        <Button 
            variant="outline" 
            className="me-2 rounded-full"
            onClick={() => router.push("/")}
        >
            <Home size={24} />
        </Button>
        <div className="overflow-x-auto overflow-hidden rounded-full flex ">
            <div className="rounded-full">
                {/* {(
                    sport.map((item) => (
                        <Button className="rounded-full" key={item.name} value={item.name} onClick={() => router.push("/match/")} disabled={item.disabled}>
                            {item.label}
                        </Button>
                    ))
                )} */}
                <Button onClick={() => router.push("/match") } className="rounded-full" variant="outline">Match</Button>
            </div>
        </div>
        </div>
        </div>
    <div style={{ height: '100vh', backgroundColor: '#f4f4f4' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        panOnScroll={true}
        nodesDraggable={false}
        panOnDrag={true}
      >
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
    </>
  )
}

export default RenderBracket
