import { Router } from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  getCurrentUser,
  updateProfile,
} from "../controllers/user.controller.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.get("/getcurrentuser", isAuthenticated, getCurrentUser);
userRouter.post("/update-profile", isAuthenticated, upload.single("photoUrl"), updateProfile);

export default userRouter;
