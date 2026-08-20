import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createCourse, editCourses, getCourseById, getCreatorCourses, getPublishedCourses, removeCourse, toggleCoursePublish } from "../controllers/course.controller.js";
import upload from "../middleware/multer.js";

const courseRouter = Router();

courseRouter.post("/create-course", isAuthenticated, createCourse);
courseRouter.get("/published-courses", getPublishedCourses);
courseRouter.get("/get-creator-courses", isAuthenticated, getCreatorCourses);
courseRouter.post("/edit-courses/:courseId", isAuthenticated, upload.single("thumbnail") ,editCourses);
courseRouter.patch("/:courseId/publish", isAuthenticated, toggleCoursePublish);
courseRouter.get("/get-course/:courseId", isAuthenticated, getCourseById);
courseRouter.delete("/remove-course/:courseId", isAuthenticated, removeCourse);

export default courseRouter;