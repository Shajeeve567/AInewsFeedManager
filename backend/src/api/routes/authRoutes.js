import { Router } from "express"
import { register, login, redirectToDashboard } from "../../controllers/auth.controller.js"
import passport from "passport";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

router.get(
    "/google/callback", 
    passport.authenticate("google", { session: false, failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=oauth` }), 
    redirectToDashboard
);

export default router;