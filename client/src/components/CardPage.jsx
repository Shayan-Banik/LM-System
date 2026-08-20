import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CardCompo from "./CardCompo";
import { serverUrl } from "../config";
import { setCourseData } from "../redux/courseSlice";

const CardPage = () => {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  useEffect(() => {
    const getPublishedCourses = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/course/published-courses`,
        );
        dispatch(setCourseData(response.data));
      } catch (error) {
        console.error("Failed to load published courses:", error);
      }
    };

    getPublishedCourses();
  }, [dispatch]);

  const popularCourse = courseData.slice(0, 3);

  return (
    <div className="relative bg-[#0a140f] flex items-center justify-center flex-col px-4 sm:px-8 py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_10%,rgba(34,197,94,0.12),transparent)]" />

      <div className="relative flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Our Popular Courses
        </h1>
        <span className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
          Our Popular Courses offer practical, industry-focused learning with
          expert guidance, hands-on projects, flexible lessons, and
          career-oriented skills to help learners build confidence, improve
          expertise, and achieve their professional goals. Learn AI, tech,
          business innovation.
        </span>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
        {popularCourse.map((course, index) => (
          <CardCompo
            key={index}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
          />
        ))}
      </div>
    </div>
  );
};

export default CardPage;