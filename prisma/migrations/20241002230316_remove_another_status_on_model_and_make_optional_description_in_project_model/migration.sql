/*
  Warnings:

  - You are about to drop the column `status` on the `link` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `tech` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "link" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tech" DROP COLUMN "status";
