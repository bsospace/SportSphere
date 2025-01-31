export interface SetScore {
    label: string;  // ชื่อของเซต เช่น "set1", "set2"
    score: number;  // คะแนนที่ได้ในเซตนั้น
    rank?: string;  // อันดับของทีมในเซตนั้น (อาจเป็น "1", "2" หรือไม่ใส่ก็ได้)
    remark?: string; // หมายเหตุเพิ่มเติม เช่น "ทีมคู่แข่งฟอร์มดี"
}

export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    auditLogs: any[];
  }
  
export interface Team {
    id: string;
    name: string;
    matchParticipants: MatchParticipant[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    auditLogs: any[];
  }
  
export interface Sport {
    id: string;
    name: string;
    slug: string;
    matches: Match[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    auditLogs: any[];
  }
  
export interface Match {
    id: string;
    matchName: string;
    location?: string | null;
    type: "duel" | "free-for-all";
    sportId: string;
    sport: Sport;
    participants: MatchParticipant[];
    date: string;
    completed?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    auditLogs: any[];
  }
  
export interface MatchParticipant {
    id: string;
    matchId: string;
    match: Match;
    teamId?: string | null;
    team?: Team | null;
    rank?: string | null;
    points?: number;
    score?: number | null;
    setScores?: SetScore[] | null;
    createdAt: Date;
    updatedAt: Date;
    auditLogs: any[];
  }
  

