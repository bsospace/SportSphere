-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "auditLogs" JSONB[];

-- AlterTable
ALTER TABLE "MatchParticipant" ADD COLUMN     "auditLogs" JSONB[];

-- AlterTable
ALTER TABLE "Sport" ADD COLUMN     "auditLogs" JSONB[];

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "auditLogs" JSONB[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auditLogs" JSONB[];
