'use client'

import React, { useState, useEffect } from 'react'
import { Clock, ChevronLeft, Save, Plus, Minus } from 'lucide-react'
import { api } from '@/app/utils/api.util'
import { useParams } from 'next/navigation'
import { useAuth } from '@/app/hooks/useAuth'
import { showCustomToast } from '@/components/CustomToast'

export default function EditMatchScorePage() {
  const { isAuthenticated, isLoading } = useAuth()
  interface Participant {
    team: {
      id: string
      name: string
    }
    score?: number
    rank?: number
    auditLogs: string[]
  }

  interface MatchData {
    id: string
    matchName: string
    location: string
    date: string
    participants: Participant[]
  }

  const [matchData, setMatchData] = useState<MatchData | null>(null)
  const [teamScores, setTeamScores] = useState<Record<string, number>>({})
  const [teamRanks, setTeamRanks] = useState<Record<string, number>>({})
  const [showAuditLogs, setShowAuditLogs] = useState(false)
  const { slug, id } = useParams() as { slug: string; id: string }

  const fetchMatchData = async () => {
    try {
      const response = await api.get(`api/v1/match/${slug}/${id}`)
      const data = response.data.data
      setMatchData(data)
    } catch (error) {
      console.error('Error fetching match data:', error)
    }
  }

  useEffect(() => {
    if (matchData) {
      const scores: Record<string, number> = {}
      const ranks: Record<string, number> = {}

      matchData.participants.forEach(participant => {
        scores[participant.team.id] = participant.score || 0
        ranks[participant.team.id] = participant.rank || 0
      })

      setTeamScores(scores)
      setTeamRanks(ranks)
    }
  }, [matchData])

  useEffect(() => {
    fetchMatchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, id])

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      window.location.href = `/auth/login?redirect=/sport/${slug}/${id}`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading])

  const handleScoreChange = (teamId: string, value: number) => {
    setTeamScores(prev => ({
      ...prev,
      [teamId]: Math.max(0, value)
    }))
  }

  const handleRankChange = (teamId: string, value: number) => {
    setTeamRanks(prev => ({
      ...prev,
      [teamId]: value
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const saveData = async () => {
    if (!matchData || !matchData.participants || matchData.participants.length < 2) {
      console.error("Invalid match data");
      return;
    }

    const formatData = {
      id: matchData.id,
      scores: matchData.participants.map((participant) => {
        const teamId = participant.team.id.toString();
        return {
          teamId,
          score: teamScores[teamId] || 0,
          rank: teamRanks[teamId] || 0,
        };
      }),
    };

    try {
      const response = await api.put(`api/v1/match/${id}/edit`, formatData);
      console.log("Data saved successfully:", response.data);
      fetchMatchData();
      showCustomToast('success','บันทึกข้อมูลสำเร็จ');
    } catch (error) {
      console.error("Error saving match data:", error);
    }
  };


  if (!matchData) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-gray-500'>กำลังโหลดข้อมูล...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-bold text-gray-900'>
              {matchData.matchName}
            </h1>
            <button
              onClick={() => setShowAuditLogs(!showAuditLogs)}
              className='flex items-center gap-2 text-gray-600 hover:text-gray-900'
            >
              <Clock size={20} />
              {showAuditLogs ? 'ซ่อนประวัติ' : 'แสดงประวัติ'}
            </button>
          </div>
          <div className='flex items-center text-gray-600'>
            <span className='mr-4'>{matchData.location}</span>
            <span>{formatDate(matchData.date)}</span>
          </div>
        </div>
        <div className={`grid grid-cols-1 ${showAuditLogs ? 'lg:grid-cols-2' : ''} gap-6`}>
          {/* Score Editor */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-4'>แก้ไขคะแนน</h2>
            <div className='flex flex-wrap gap-4'>
              {matchData.participants.map(participant => (
                <div
                  key={participant.team.id}
                  className={`mb-6 p-4 ${showAuditLogs ? 'w-full' : 'max-w-[350px]'} bg-gray-50 rounded-lg`}
                >
                  <h3 className='font-medium text-gray-900 mb-3'>
                    {participant.team.name}
                  </h3>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm text-gray-600 mb-1'>
                        คะแนน
                      </label>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() =>
                            handleScoreChange(
                              participant.team.id,
                              (teamScores[participant.team.id] || 0) - 1
                            )
                          }
                          className='p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-600'
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type='number'
                          value={teamScores[participant.team.id] || 0}
                          onChange={e =>
                            handleScoreChange(
                              participant.team.id,
                              parseInt(e.target.value)
                            )
                          }
                          className='flex-1 p-2 border rounded text-center'
                          min='0'
                        />
                        <button
                          onClick={() =>
                            handleScoreChange(
                              participant.team.id,
                              (teamScores[participant.team.id] || 0) + 1
                            )
                          }
                          className='p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-600'
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm text-gray-600 mb-1'>
                        ผลการแข่งขัน
                      </label>
                      {matchData.participants.length == 2 ?
                        <select
                          value={teamRanks[participant.team.id] || 0}
                          onChange={e =>
                            handleRankChange(
                              participant.team.id,
                              parseInt(e.target.value)
                            )
                          }
                          className='w-full p-2 border rounded'
                        >
                          <option value={""}>--</option>
                          <option value={1}>ชนะ</option>
                          <option value={2}>แพ้</option>
                          <option value={3}>เสมอ</option>
                        </select>
                        :
                        <select value={teamRanks[participant.team.id] || 0} onChange={e => handleRankChange(participant.team.id, parseInt(e.target.value))} className='w-full p-2 border rounded'>
                          <option value={""}>--</option>
                          {matchData.participants.map((participant, index) => (
                            <option value={5 - index}>{index + 1}</option>
                          ))}
                        </select>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showAuditLogs && (
            <div className='bg-white rounded-lg shadow-sm p-6  max-h-screen overflow-y-auto'>
              <h2 className='text-lg font-semibold mb-4'>ประวัติการแก้ไข</h2>
              <div className='space-y-4'>
                {(() => {
                  // รวม audit logs ทั้งหมดจากทุก participant
                  const allLogs: Array<{
                    timestamp: string
                    metadata?: {
                      scoreChanges?: Array<{
                        previous: { score: number }
                        updated: { score: number; teamName: string }
                      }>
                    }
                    email: string
                  }> = []

                  matchData.participants.forEach(participant => {
                    participant.auditLogs.forEach(log => {
                      try {
                        const parsedLog = JSON.parse(log)
                        if (Array.isArray(parsedLog)) {
                          allLogs.push(...parsedLog)
                        }
                      } catch (error) {
                        console.error('Error parsing audit log:', error)
                      }
                    })
                  })

                  // เรียงลำดับจากใหม่ -> เก่า
                  allLogs.sort((a, b) => {
                    return (
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                    )
                  })

                  // แสดงข้อมูลหลังจากเรียงลำดับแล้ว
                  return allLogs.map((parsedLog, i) => {
                    const changes =
                      parsedLog.metadata?.scoreChanges &&
                        Array.isArray(parsedLog.metadata.scoreChanges)
                        ? parsedLog.metadata.scoreChanges
                        : null

                    if (!changes) {
                      return (
                        <div key={i} className='p-4 bg-gray-50 rounded-lg'>
                          <div className='text-sm text-gray-600'>
                            ข้อมูลการเปลี่ยนแปลงไม่สมบูรณ์
                          </div>
                        </div>
                      )
                    }

                    return changes?.map((change, j) => (
                      <div
                        key={`${i}-${j}`}
                        className='p-4 bg-gray-50 rounded-lg'
                      >
                        <div className='flex justify-between items-start mb-2'>
                          <span className='text-sm font-medium text-gray-900'>
                            {change.updated.teamName}
                          </span>
                          <span className='text-xs text-gray-500'>
                            {formatDate(parsedLog.timestamp)}
                          </span>
                        </div>
                        <div className='text-sm text-gray-600'>
                          เปลี่ยนคะแนนจาก {change.previous.score} เป็น{' '}
                          {change.updated.score}
                        </div>
                        <div className='text-xs text-gray-500 mt-1'>
                          แก้ไขโดย: {parsedLog.email}
                        </div>
                      </div>
                    ))
                  })
                })()}
              </div>
            </div>
          )}
        </div>

        <div className='flex justify-center gap-4 mt-6'>
          <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200'>
            <ChevronLeft size={20} />
            กลับ
          </button>
          <button className='flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' onClick={saveData}>
            <Save size={20} />
            บันทึก
          </button>
        </div>
      </div>
    </div>
  )
}
