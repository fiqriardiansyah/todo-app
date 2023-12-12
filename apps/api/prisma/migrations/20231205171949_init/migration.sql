-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "password" TEXT,
ADD COLUMN     "secure" BOOLEAN NOT NULL DEFAULT false;
