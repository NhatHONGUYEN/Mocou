/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `WordList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WordList_category_key" ON "WordList"("category");
