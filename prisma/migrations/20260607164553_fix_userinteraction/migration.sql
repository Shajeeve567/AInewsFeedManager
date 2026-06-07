/*
  Warnings:

  - You are about to drop the column `artcileId` on the `UserInteraction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,articleId,type]` on the table `UserInteraction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `articleId` to the `UserInteraction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserInteraction" DROP COLUMN "artcileId",
ADD COLUMN     "articleId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "UserInteraction_userId_idx" ON "UserInteraction"("userId");

-- CreateIndex
CREATE INDEX "UserInteraction_articleId_idx" ON "UserInteraction"("articleId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInteraction_userId_articleId_type_key" ON "UserInteraction"("userId", "articleId", "type");

-- AddForeignKey
ALTER TABLE "UserInteraction" ADD CONSTRAINT "UserInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInteraction" ADD CONSTRAINT "UserInteraction_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
