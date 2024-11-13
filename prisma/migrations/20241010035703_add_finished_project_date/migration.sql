/*
  Warnings:

  - Added the required column `finished_at` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "finished_at" TIMESTAMP(3) NOT NULL;
