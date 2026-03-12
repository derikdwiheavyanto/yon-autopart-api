/*
  Warnings:

  - Added the required column `price` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total_price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderItems" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "total_price" INTEGER NOT NULL DEFAULT 0;
