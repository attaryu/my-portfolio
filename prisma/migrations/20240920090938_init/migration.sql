-- CreateEnum
CREATE TYPE "MediaExtension" AS ENUM ('svg', 'jpg', 'jpeg', 'png');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('draft', 'published', 'archived');

-- CreateEnum
CREATE TYPE "ProjectLabel" AS ENUM ('personal', 'paid');

-- CreateTable
CREATE TABLE "media" (
    "id" OID NOT NULL,
    "title" TEXT NOT NULL,
    "extension" "MediaExtension" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link" (
    "id" OID NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech" (
    "id" OID NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'draft',
    "logoId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" OID NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'draft',
    "label" "ProjectLabel" NOT NULL,
    "coverId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_link" (
    "subtitle" TEXT NOT NULL,
    "linkId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "project_preview" (
    "id" OID NOT NULL,
    "order" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "project_preview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing" (
    "id" OID NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'draft',

    CONSTRAINT "landing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media" (
    "linkId" INTEGER NOT NULL,
    "landingId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "selected_project" (
    "projectId" INTEGER NOT NULL,
    "landingId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToTech" (
    "A" OID NOT NULL,
    "B" OID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "media_title_key" ON "media"("title");

-- CreateIndex
CREATE UNIQUE INDEX "link_url_key" ON "link"("url");

-- CreateIndex
CREATE UNIQUE INDEX "tech_name_key" ON "tech"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tech_logoId_key" ON "tech"("logoId");

-- CreateIndex
CREATE UNIQUE INDEX "project_title_key" ON "project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "project_coverId_key" ON "project"("coverId");

-- CreateIndex
CREATE UNIQUE INDEX "project_link_linkId_key" ON "project_link"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "project_link_linkId_projectId_key" ON "project_link"("linkId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "project_preview_imageId_key" ON "project_preview"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "project_preview_projectId_order_imageId_key" ON "project_preview"("projectId", "order", "imageId");

-- CreateIndex
CREATE UNIQUE INDEX "social_media_linkId_key" ON "social_media"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "selected_project_projectId_key" ON "selected_project"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTech_AB_unique" ON "_ProjectToTech"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTech_B_index" ON "_ProjectToTech"("B");

-- AddForeignKey
ALTER TABLE "tech" ADD CONSTRAINT "tech_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_link" ADD CONSTRAINT "project_link_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_link" ADD CONSTRAINT "project_link_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_preview" ADD CONSTRAINT "project_preview_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_preview" ADD CONSTRAINT "project_preview_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_media" ADD CONSTRAINT "social_media_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_media" ADD CONSTRAINT "social_media_landingId_fkey" FOREIGN KEY ("landingId") REFERENCES "landing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selected_project" ADD CONSTRAINT "selected_project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selected_project" ADD CONSTRAINT "selected_project_landingId_fkey" FOREIGN KEY ("landingId") REFERENCES "landing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_A_fkey" FOREIGN KEY ("A") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_B_fkey" FOREIGN KEY ("B") REFERENCES "tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;
