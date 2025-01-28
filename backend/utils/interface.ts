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