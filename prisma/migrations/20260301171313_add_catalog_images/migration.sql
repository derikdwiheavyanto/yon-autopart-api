/*
  Warnings:

  - You are about to drop the column `image` on the `Catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Catalog" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "CatalogImage" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "catalogId" INTEGER NOT NULL,

    CONSTRAINT "CatalogImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CatalogImage" ADD CONSTRAINT "CatalogImage_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
