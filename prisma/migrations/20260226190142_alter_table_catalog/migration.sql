/*
  Warnings:

  - Added the required column `price` to the `Catalog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Catalog" ADD COLUMN     "price" INTEGER NOT NULL;
