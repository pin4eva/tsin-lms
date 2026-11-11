/*
  Warnings:

  - A unique constraint covering the columns `[userId,strategy]` on the table `auths` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "auths_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "auths_userId_strategy_key" ON "auths"("userId", "strategy");
