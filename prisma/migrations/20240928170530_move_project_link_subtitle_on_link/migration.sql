/*
  Warnings:

  - You are about to drop the column `subtitle` on the `project_link` table. All the data in the column will be lost.
  - Added the required column `subtitle` to the `link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "link" ADD COLUMN     "subtitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "project_link" DROP COLUMN "subtitle";
