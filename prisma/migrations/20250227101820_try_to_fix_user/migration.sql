/*
  Warnings:

  - You are about to drop the column `score` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "score";

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Score_userId_idx" ON "Score"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Word_wordListId_idx" ON "Word"("wordListId");
