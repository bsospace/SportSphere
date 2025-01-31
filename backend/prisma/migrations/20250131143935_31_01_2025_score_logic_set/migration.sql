-- AlterTable
ALTER TABLE "MatchParticipant" ADD COLUMN     "setScores" JSONB,
ALTER COLUMN "score" DROP DEFAULT;
