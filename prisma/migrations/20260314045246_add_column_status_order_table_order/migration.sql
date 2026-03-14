-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('NEW', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status_order" "StatusOrder" NOT NULL DEFAULT 'NEW';
