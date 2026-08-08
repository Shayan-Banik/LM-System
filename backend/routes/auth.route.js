import { Router } from "express";

import { signUp, login, logout, sendOTP, verifyOTP, resetPassword, googleAuth} from "./../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-otp", sendOTP);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google-auth", googleAuth);



export default authRouter;