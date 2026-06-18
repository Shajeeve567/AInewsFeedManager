import { Router } from "express"
import { getArticles, getArticleById, interactWithArticle } from "../../controllers/article.controller.js"

const router = Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/:id/interact", interactWithArticle);

export default router;