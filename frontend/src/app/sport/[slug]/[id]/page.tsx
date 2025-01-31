'use client'

import React, { useState, useEffect } from 'react'
import { Clock, ChevronLeft, Save, Plus, Minus } from 'lucide-react'
import { api } from '@/app/utils/api.util'
import { useParams } from 'next/navigation'
import { useAuth } from '@/app/hooks/useAuth'
import { Loader2 } from 'lucide-react';
import { showCustomToast } from '@/components/CustomToast'
import { formatDateRange } from '@/app/utils/formatdate-range.util'
import MatchEndConfirmation from '@/components/MatchEndConfirmation'

export default function EditMatchScorePage() {
  const { isAuthenticated, isLoading } = useAuth()

  interface SetScore {
    label: string;
    score: number;
    rank?: string;
    remark?: string;
  }

  interface Participant {
    team: {
      id: string
      name: string
    }
    score?: number
    rank?: number
    auditLogs: string[]
    setScores?: SetScore[]
  }

  interface MatchData {
    id: string
    type: string
    matchName: string
    location: string
    date: string
    participants: Participant[]
    completed: Date
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

  const handleRankChangeForSetScore = (teamId: string, setIndex: number, value: number) => {
    setMatchData(prevMatchData => {
      if (!prevMatchData) return prevMatchData;

      const updatedParticipants = prevMatchData.participants.map(participant => {
        if (participant.team.id !== teamId) return participant;

        // Clone the setScores array to modify safely
        const updatedSetScores = participant.setScores ? [...participant.setScores] : [];

        if (updatedSetScores[setIndex]) {
          updatedSetScores[setIndex] = {
            ...updatedSetScores[setIndex],
            rank: value.toString(),
          };
        }

        return { ...participant, setScores: updatedSetScores };
      });

      return { ...prevMatchData, participants: updatedParticipants };
    });
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Bangkok'
    }) + " น.";
  };

  const saveData = async () => {
    if (!matchData || !matchData.participants || matchData.participants.length < 2) {
      console.error("Invalid match data");
      return;
    }

    // Check if any participant has setScores
    const hasSetScores = matchData.participants.some(participant => participant.setScores && participant.setScores.length > 0);

    // Prepare Data
    const formatData = {
      id: matchData.id,
      ...(hasSetScores
        ? {
          setScores: matchData.participants.map(participant => ({
            teamId: participant.team.id.toString(),
            setScores: participant.setScores?.map(set => ({
              label: set.label,
              score: set.score,
              rank: set.rank || "",
              remark: set.remark || "",
            })) || [],
          })),
        }
        : {
          scores: matchData.participants.map(participant => ({
            teamId: participant.team.id.toString(),
            score: teamScores[participant.team.id] || 0,
            rank: teamRanks[participant.team.id] || 0,
          })),
        }),
    };

    // Determine API endpoint
    const apiEndpoint = hasSetScores ? `api/v1/match/${id}/edit-set-score` : `api/v1/match/${id}/edit`;

    try {
      const response = await api.put(apiEndpoint, formatData);
      console.log("Data saved successfully:", response.data);
      fetchMatchData();
      showCustomToast('success', 'บันทึกข้อมูลสำเร็จ');
    } catch (error) {
      console.error("Error saving match data:", error);
    }
  };


  const handleSetScoreChange = (teamId: string, setIndex: number, newScore: number) => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      return {
        ...prevMatchData,
        participants: prevMatchData.participants.map((participant) => {
          if (participant.team.id !== teamId) return participant;

          const updatedSetScores = participant.setScores ? [...participant.setScores] : [];
          if (updatedSetScores[setIndex]) {
            updatedSetScores[setIndex] = {
              ...updatedSetScores[setIndex],
              score: Math.max(0, newScore),
            };
          }

          return { ...participant, setScores: updatedSetScores };
        }),
      };
    });
  };


  const onEndMatch = async () => {
    try {

      const response = await api.put(`api/v1/match/${id}/end`);
      console.log("Data saved successfully:", response.data);
      fetchMatchData();
      showCustomToast('success', 'บันทึกข้อมูลสำเร็จ');
    } catch (error) {
      console.error("Error saving match data:", error);
    }
  }

  if (!matchData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-4">
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words sm:break-normal">
                <span className="block sm:inline">{matchData.id} |</span>{' '}
                <span className="block sm:inline">{matchData.matchName}</span>{' '}
                <span className="inline-block mt-1 sm:mt-0">[{matchData.type.toUpperCase()}]</span>
              </h1>

              <div className="inline-flex">
                {matchData?.completed !== null ? (
                  <span className='px-3 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full flex items-center gap-1.5 whitespace-nowrap'>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400"></span>
                    </span>
                    <p>จบแล้ว</p>
                  </span>
                ) : (
                  <span className='px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full flex items-center gap-1.5 whitespace-nowrap'>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <p>กำลังดำเนินการ</p>
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowAuditLogs(!showAuditLogs)}
              className='flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors'
            >
              <Clock size={18} />
              <span className="text-sm">
                {showAuditLogs ? 'ซ่อนประวัติ' : 'แสดงประวัติ'}
              </span>
            </button>
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center text-gray-600 gap-2 sm:gap-4'>
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span className="text-sm">{matchData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🕐</span>
              <span className="text-sm">{formatDateRange(matchData.date)}</span>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${showAuditLogs ? 'lg:grid-cols-2' : ''} gap-6`}>
          {/* Score Editor */}
          <div className='bg-white rounded-lg p-4'>
            <h2 className='text-lg flex font-semibold mb-4'>แก้ไขคะแนน</h2>
            <div className='md:flex flex flex-col gap-4 '>
              <div className="md:flex md:flex-row md:max-w-[500px] gap-5 flex flex-col">
                {matchData.participants.map(participant => (
                  <div
                    key={participant.team.id}
                    className="mb-6 md:p-6 w-full  rounded-2xl bg-gray-100 p-4"
                  >
                    {/* Team Name */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-900">{participant.team.name}</h3>
                    </div>

                    {/* Set Scores Section */}
                    {participant?.setScores != null && participant?.setScores.length > 0 ? (
                      <>
                        <div className="mt-4 mb-4 flex-col gap-4 w-full">

                          {participant?.setScores && participant?.setScores.map((setScore, i) => (
                            <div
                              key={i}
                              className="p-4 flex flex-col items-center justify-center "
                            >
                              {/* Set Label */}
                              <span className="text-sm font-medium ">{setScore.label}</span>

                              {/* Score Controls */}
                              <div className=" w-full flex items-center gap-3 mt-2  justify-center ">
                                <button
                                  onClick={() => handleRankChangeForSetScore(participant.team.id, i, (setScore.score || 0) - 1)}
                                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                                >
                                  <Minus size={16} className="text-gray-700" />
                                </button>
                                <input
                                  type="number"
                                  value={setScore.score || 0}
                                  onChange={e => handleRankChangeForSetScore(participant.team.id, i, parseInt(e.target.value))}
                                  className="w-14 text-center text-lg font-semibold p-2 border rounded-lg bg-white shadow-inner"
                                  min="0"
                                />
                                <button
                                  onClick={() => handleRankChangeForSetScore(participant.team.id, i, (setScore.score || 0) + 1)}
                                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                          <hr />
                        </div>
                      </>
                    ) : (
                      // Standard Score Input for sports without sets
                      <>
                        <div className="mt-4 w-full md:max-w-[400px] mb-4">
                          <label className="block text-sm text-gray-600 mb-1">คะแนน</label>
                          <div className="flex items-center gap-3 w-full justify-center">
                            <button
                              onClick={() => handleScoreChange(participant.team.id, (teamScores[participant.team.id] || 0) - 1)}
                              className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                            >
                              <Minus size={16} className="text-gray-700" />
                            </button>
                            <input
                              type="number"
                              value={teamScores[participant.team.id] || 0}
                              onChange={e => handleScoreChange(participant.team.id, parseInt(e.target.value))}
                              className="w-20 text-center text-lg font-semibold p-2 border rounded-lg bg-white shadow-inner"
                              min="0"
                            />
                            <button
                              onClick={() => handleScoreChange(participant.team.id, (teamScores[participant.team.id] || 0) + 1)}
                              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    {/* Ranking Selection */}
                    <div className="mt-6">
                      <label className="block text-sm text-gray-600 mb-2">ผลการแข่งขัน</label>
                      <select
                        value={teamRanks[participant.team.id] || 0}
                        onChange={e => handleRankChange(participant.team.id, parseInt(e.target.value))}
                        className="w-full p-3 border rounded-lg text-gray-900 bg-gray-50 focus:ring focus:ring-blue-300"
                      >
                        <option value={""}>--</option>
                        {matchData.participants.length === 2 ? (
                          <>
                            <option value={1}>🏆 ชนะ</option>
                            <option value={2}>❌ แพ้</option>
                            <option value={3}>🤝 เสมอ</option>
                          </>
                        ) : (
                          matchData.participants.map((_, index) => (
                            <option key={index} value={index + 1}>
                              🥇 อันดับ {index + 1}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
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
          <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200' onClick={() => window.location.href = `/sport/${slug}`}>
            <ChevronLeft size={20} />
            กลับ
          </button>
          <button className='flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' onClick={saveData}>
            <Save size={20} />
            บันทึก
          </button>
          {/* endMatch */}
          <MatchEndConfirmation onEndMatch={onEndMatch} />
        </div>
      </div>
    </div>
  )
}
