export interface AuditLog {
    timestamp: string;
    action: string;
    email?: string;
    userId?: string;
    service: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    success: boolean;
    metadata?: Record<string, any>;
}

export interface SetScore {
    label: string;  // ชื่อของเซต เช่น "set1", "set2"
    score: number;  // คะแนนที่ได้ในเซตนั้น
    rank?: string;  // อันดับของทีมในเซตนั้น (อาจเป็น "1", "2" หรือไม่ใส่ก็ได้)
    remark?: string; // หมายเหตุเพิ่มเติม เช่น "ทีมคู่แข่งฟอร์มดี"
}