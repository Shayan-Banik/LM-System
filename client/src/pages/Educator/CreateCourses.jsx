import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
import { serverUrl } from "../../config";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const categories = [
  "Web Development",
  "UI/UX Designing",
  "App Development",
  "Ethical Hacking",
  "AI/ML",
  "Data Science",
  "Data Analytics",
  "AI Tools",
];

export default function CreateCourse() {

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a course title.");
      return;
    }
    if (!category) {
      setError("Please select a category.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${serverUrl}/api/course/create-course`, {
        title: title.trim(),
        category,
      }, {
        withCredentials: true
      });
      console.log("Course created successfully:", response.data);
      // dispatch(setCreatorCourseData(response.data));
      navigate("/courses");
      toast.success("Course created successfully!");

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a140f] relative overflow-hidden flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(34,197,94,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(16,185,129,0.1),transparent)]" />

      <form
      onSubmit={handleCreateCourse}
      className="relative bg-[#0f1a14]/90 backdrop-blur-sm border border-emerald-500/20 shadow-lg shadow-emerald-900/30 rounded-2xl p-8 max-w-lg w-full">

        {/* Header */}
        <div className="relative flex items-center justify-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 cursor-pointer" />
          </button>
          <h1 className="text-2xl font-bold text-white">Create Course</h1>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2">
            {error}
          </div>
        )}

        {/* Course Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Course Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
            className="w-full rounded-xl bg-[#13221a] border border-emerald-500/30 text-white placeholder-gray-500 px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-xl bg-[#13221a] border border-emerald-500/30 text-white px-4 py-3 pr-10
                focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
            >
              <option value="" disabled className="text-gray-500">
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#13221a] text-white">
                  {cat}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Create button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-linear-to-r from-green-500 to-emerald-500 text-white font-semibold py-3
            shadow-[0_8px_30px_-8px_rgba(34,197,94,0.5)] hover:scale-[1.01] transition-transform
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? <ClipLoader color="#fff" size={30} /> : "Create"}
        </button>

      </form>
    </div>
  );
}