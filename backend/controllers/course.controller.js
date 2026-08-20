import Course from "../models/course.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Title and category fields are required" });
    }
    const course = await Course.create({
      title,
      category,
      creator: req.userId,
    });
    return res.status(201).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `createCourse Error: ${error.message}` });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });
    if (!courses) {
      return res.status(404).json({ message: "No published courses found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({
      message: `Failed to find any published courses: ${error.message}`,
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ message: "No published courses found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get creator courses: ${error.message}` });
  }
};

export const editCourses = async (req, res) => {
  try {
    const { courseId } = req.params; // get this from frontend using req.params
    const {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
    } = req.body;

    let thumbnail;
    if (req.file) {
      const imageUrl = await uploadOnCloudinary(req.file.path);
      if (!imageUrl) {
        return res.status(500).json({
          message: "Failed to upload image to Cloudinary",
        });
      }
      thumbnail = imageUrl;
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
    };

    if (thumbnail) {
      updateData.thumbnail = thumbnail;
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not updated" });
    } else {
      return res
        .status(200)
        .json({
          message: "Course updated successfully",
          course: updatedCourse,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to edit course: ${error.message}` });
  }
};

export const toggleCoursePublish = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { isPublished } = req.body;

    if (typeof isPublished !== "boolean") {
      return res.status(400).json({ message: "isPublished must be a boolean" });
    }

    const course = await Course.findByIdAndUpdate(
      courseId,
      { isPublished },
      { returnDocument: "after", runValidators: true },
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: isPublished ? "Course published successfully" : "Course unpublished successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to update publish status: ${error.message}`,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getCourseById Error: ${error.message}` });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not deleted" });
    }

    return res
      .status(200)
      .json({ message: "Course deleted successfully", course: deletedCourse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `removeCourses Error: ${error.message}` });
  }
};
