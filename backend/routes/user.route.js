import { Router } from "express";

import { getCurrentUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const userRouter = Router();

userRouter.get("/getcurrentuser", isAuthenticated ,getCurrentUser);

export default userRouter;