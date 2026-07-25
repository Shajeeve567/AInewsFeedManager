import { Router } from "express"
import { getUserById, updateUserPreference } from "../../controllers/user.controller.js"
import {
  getUserSources,
  addExistingSource,
  createAndAssignSource,
  removeUserSource
} from "../../controllers/userSource.controller.js"

const router = Router()

router.get("/:id", getUserById)
router.put("/:id/preferences", updateUserPreference)

router.get("/:userId/sources", getUserSources)
router.post("/:userId/sources", addExistingSource)
router.post("/:userId/sources/custom", createAndAssignSource)
router.delete("/:userId/sources/:sourceId", removeUserSource)

export default router
