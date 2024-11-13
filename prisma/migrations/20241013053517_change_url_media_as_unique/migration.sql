/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `media` will be added. If there are existing duplicate values, this will fail.
  - Made the column `url` on table `media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "media" ALTER COLUMN "url" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "media_url_key" ON "media"("url");
