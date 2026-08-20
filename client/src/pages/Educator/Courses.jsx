import { ArrowLeft, Plus, Pencil, BookOpen } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../config";
import axios from "axios";
import { setCreatorCourseData } from "../../redux/courseSlice";

export default function Courses() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/course/get-creator-courses`,
          {
            withCredentials: true,
          },
        );
        console.log(response.data);
        dispatch(setCreatorCourseData(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    creatorCourses();
  }, [userData]);

  return (
    <div className="min-h-screen bg-[#0a140f] relative overflow-hidden px-4 sm:px-8 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_10%,rgba(34,197,94,0.12),transparent)]" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-emerald-400 hover:text-emerald-300 transition-colors">
              <ArrowLeft className="w-6 h-6 cursor-pointer" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Courses
            </h1>
          </div>

          <button
            onClick={() => navigate("/create-courses")}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-green-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(34,197,94,0.5)] hover:scale-[1.03] transition-transform cursor-pointer">
            <Plus className="w-4 h-4 cursor-pointer" />
            Create Course
          </button>
        </div>

        {/* Table card */}
        <div className="bg-[#0f1a14]/90 backdrop-blur-sm border border-emerald-500/20 shadow-lg shadow-emerald-900/30 rounded-2xl overflow-hidden">
          {/* Table head — desktop only */}
          <div className="hidden sm:grid grid-cols-[1fr_100px_120px_80px] gap-4 px-6 py-4 border-b border-emerald-500/10 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            <span>Course</span>
            <span>Price</span>
            <span>Status</span>
            <span className="text-right">Action</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-emerald-500/10">
            {creatorCourseData?.map((course) => (
              <div
                key={course._id}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_100px_120px_80px] gap-4 items-center px-4 sm:px-6 py-4 hover:bg-emerald-500/5 transition-colors">
                {/* Thumbnail + title */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-11 sm:w-20 sm:h-12 rounded-lg overflow-hidden bg-[#13221a] border border-emerald-500/10 shrink-0">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <BookOpen className="w-6 h-6 text-emerald-400" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm sm:text-base text-white font-medium truncate">
                    {course.title}
                  </span>
                </div>

                {/* Price — desktop */}
                <span className="hidden sm:block text-gray-300 font-medium">
                  <span
                    className={`text-sm font-medium ${
                      course?.price ? "text-emerald-400" : "text-blue-500"
                    }`}>
                    {course?.price ? `₹${course.price}` : "N/A"}
                  </span>
                </span>

                {/* Status — desktop */}
                <div className="hidden sm:block">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      course?.isPublished
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${course?.isPublished ? "bg-emerald-400" : "bg-red-400"}`}
                    />
                    {course?.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                {/* Action */}
                <div className="flex sm:justify-end">
                  <button
                    onClick={() => navigate(`/edit-course/${course?._id}`)}
                    className="p-2 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                    title="Edit course">
                    <Pencil className="w-4 h-4 cursor-pointer" />
                  </button>
                </div>

                {/* Price + status — mobile, second line */}
                <div className="sm:hidden col-span-2 flex items-center gap-6 pl-20">
                  <span
                    className={`text-sm font-medium ${
                      course?.price ? "text-emerald-400" : "text-blue-500"
                    }`}>
                    {course?.price ? `₹${course.price}` : "N/A"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      course?.isPublished
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${course?.isPublished ? "bg-emerald-400" : "bg-red-400"}`}
                    />
                    {course?.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 text-center text-xs text-gray-500 border-t border-emerald-500/10">
            A list of your recent courses.
          </div>
        </div>
      </div>
    </div>
  );
}
