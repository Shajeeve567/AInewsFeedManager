/*
  Warnings:

  - Added the required column `config` to the `Source` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Source` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('API', 'RSS');

-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "config" JSONB NOT NULL,
ADD COLUMN     "type" "SourceType" NOT NULL;
