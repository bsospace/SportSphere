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
const nodeTypes = { brucket: BrucketDisplay, label: LabelNode }

const RenderBracket: React.FC = () => {
  const router = useRouter()
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBracketData = async () => {
      try {
        const response = await fetch(`/assets/data/valorant.json`)
        if (!response.ok) throw new Error(`Failed to load valorant.json`)
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
  }, [])

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin'></div>
        <p className='mt-4 text-gray-600 text-lg'>กำลังโหลดข้อมูล...</p>
      </div>
    )
  }

  if (error) {
    return <div className='text-center text-red-500'>{error}</div>
  }

  return (
    <>
      <div className='absolute top-10 left-0 right-0 z-10'>
        <div className='flex lg:w-[90%] w-full justify-center items-center mx-auto'>
          <Button
            variant='outline'
            className='me-2 rounded-full'
            onClick={() => router.push('/')}
          >
            <Home size={24} />
          </Button>
          <div className='overflow-x-auto overflow-hidden rounded-full flex '>
            <div className='rounded-full'>
              {/* {(
                    sport.map((item) => (
                        <Button className="rounded-full" key={item.name} value={item.name} onClick={() => router.push("/match/")} disabled={item.disabled}>
                            {item.label}
                        </Button>
                    ))
                )} */}
              <Button
                onClick={() => router.push('/match')}
                className='rounded-full'
                variant='outline'
              >
                Match
              </Button>
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
