-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('READ', 'SAVE', 'CLICK');

-- CreateTable
CREATE TABLE "UserInteraction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "artcileId" INTEGER NOT NULL,
    "type" "InteractionType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserInteraction_pkey" PRIMARY KEY ("id")
);
