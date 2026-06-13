import { Router } from "express";
import { getAllSources, getSourceById, addNewSource, editSource, removeSource } from "../../controllers/source.controller.js";

const router = Router();

router.get("/", getAllSources);
router.get("/:id", getSourceById);
router.post("/", addNewSource);
router.put("/:id", editSource);
router.delete("/:id", removeSource);

export default router;