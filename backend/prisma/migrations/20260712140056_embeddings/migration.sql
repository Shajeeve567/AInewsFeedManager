-- CreateTable
CREATE TABLE "ArticleEmbeddings" (
    "id" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,
    "embedding" DOUBLE PRECISION[],

    CONSTRAINT "ArticleEmbeddings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleEmbeddings_articleId_key" ON "ArticleEmbeddings"("articleId");

-- AddForeignKey
ALTER TABLE "ArticleEmbeddings" ADD CONSTRAINT "ArticleEmbeddings_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
