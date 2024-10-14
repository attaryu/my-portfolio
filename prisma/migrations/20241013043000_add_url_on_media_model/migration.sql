-- AlterTable
ALTER TABLE "media" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "finished_at" SET DEFAULT CURRENT_TIMESTAMP;
