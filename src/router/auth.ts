import express from "express"
import { googleLogin,refreshAccessToken,logOut } from "../controller/authController";

const router=express.Router();

router.get("/google", googleLogin);
router.get("/refreshAccessToken/:id",refreshAccessToken);
router.get("/logout/:id",logOut);

export default router;