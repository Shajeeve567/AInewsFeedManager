import { Router } from "express"
import { getUserById, updateUserPreference } from "../../controllers/user.controller.js"

const router = Router()

router.get("/:id", getUserById)
router.put("/:id/preferences", updateUserPreference)

export default router
