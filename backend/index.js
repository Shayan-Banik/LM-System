import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";

const PORT = process.env.PORT || 8000;
const app = express();

// Built in Middlewares
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// User defined Middlewares
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});