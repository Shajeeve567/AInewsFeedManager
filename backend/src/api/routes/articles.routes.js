import { Router } from "express"
import { getArticles, getArticleById, interactWithArticle, queueSummarize } from "../../controllers/article.controller.js"

const router = Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/:id/interact", interactWithArticle);
router.post("/:id/summarize", queueSummarize);

export default router;