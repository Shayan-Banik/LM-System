import { useState, useEffect } from "react";
import { ArrowLeft, ImagePlus, Pencil, IndianRupee } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../config";
import { toast } from "react-toastify";

const categories = [
  "Web Development",
  "UI/UX Designing",
  "App Development",
  "Ethical Hacking",
  "AI/ML",
  "Data Science",
  "Data Analytics",
  "AI Tools",
  "Flutter",
  "Others",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function EditCourses() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [isPublished, setIsPublished] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
  const getCourseById = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/course/get-course/${courseId}`, {
        withCredentials: true,
      });
      const data = result.data;

      setTitle(data?.title || "");
      setSubtitle(data?.subTitle || "");
      setDescription(data?.description || "");
      setCategory(data?.category || "");
      setLevel(data?.level || "");
      setPrice(data?.price ?? 0);
      setIsPublished(data?.isPublished || false);
      setThumbnailPreview(data?.thumbnail || null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Couldn't load course details.");
    } finally {
      setIsLoading(false);
    }
  };

  if (courseId) getCourseById();
}, [courseId]);

  const handleTogglePublish = async () => {
    setError("");
    setSuccess("");
    setIsPublishing(true);
    try {
      const res = await axios.patch(
        `${serverUrl}/api/course/${courseId}/publish`,
        { isPublished: !isPublished },
        { withCredentials: true },
      );
      setIsPublished(res.data.course.isPublished);
      setSuccess(res.data.message);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Couldn't update publish status.");
    } finally {
      setIsPublishing(false);
    }
  };

    const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    setError("");
    setSuccess("");
    setThumbnailFile(file); // for backend upload
    setThumbnailPreview(URL.createObjectURL(file)); // for preview only
  };

  const handleRemoveCourse = async () => {
    if (
      !window.confirm(
        "Are you sure you want to remove this course? This can't be undone.",
      )
    )
      return;

    try {
      setError("");
      setSuccess("");
      setIsDeleting(true);
      const res = await axios.delete(`${serverUrl}/api/course/remove-course/${courseId}`, {
        withCredentials: true,
      });
      setSuccess(res.data.message);
      toast.success("Course removed successfully.");
      navigate("/courses");
    } catch (err) {
      console.error(err);
      toast.error("Couldn't remove course.");
      setError(err.response?.data?.message || "Couldn't remove course.");

    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim() || !category) {
      setError(!title.trim() ? "Course title is required." : "Course category is required.");
      return;
    }
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("subTitle", subtitle.trim());
      formData.append("description", description.trim());
      formData.append("category", category);
      formData.append("level", level);
      formData.append("price", price);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      const res = await axios.post(
        `${serverUrl}/api/course/edit-courses/${courseId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setSuccess(res.data.message || "Course saved successfully.");
      toast.success("Course saved successfully.");
      setThumbnailFile(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong while saving. Please try again.");
      toast.error("Something went wrong while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a140f] relative overflow-hidden px-4 sm:px-8 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_10%,rgba(34,197,94,0.12),transparent)]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
              <ArrowLeft className="w-6 h-6 cursor-pointer" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Add detail information regarding course
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/`)}
            className="rounded-full bg-linear-to-r from-green-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(34,197,94,0.5)] hover:scale-[1.03] transition-transform whitespace-nowrap">
            Go to lectures page
          </button>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSave}
          className="bg-[#0f1a14]/90 backdrop-blur-sm border border-emerald-500/20 shadow-lg shadow-emerald-900/30 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white mb-4">
            Basic Course Information
          </h2>

          {isLoading && (
            <div className="mb-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm px-4 py-2">
              Loading course details...
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm px-4 py-2">
              {success}
            </div>
          )}

          {/* Publish / Remove */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              type="button"
              onClick={handleTogglePublish}
              disabled={isLoading || isPublishing || isSaving || isDeleting}
              className={`rounded-full px-5 py-2 text-sm font-semibold border transition-colors ${
                isPublished
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-gray-500/10 text-gray-400 border-gray-500/30 hover:bg-gray-500/20"
              }`}>
              {isPublishing ? "Updating..." : isPublished ? "Click to Unpublish" : "Click to Publish"}
            </button>

            <button
              type="button"
              onClick={handleRemoveCourse}
              disabled={isLoading || isPublishing || isSaving || isDeleting}
              className="rounded-full px-5 py-2 text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors">
              {isDeleting ? "Removing..." : "Remove Course"}
            </button>
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Course Title"
              className="w-full rounded-xl bg-[#13221a] border border-emerald-500/30 text-white placeholder-gray-500 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Subtitle */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Subtitle"
              className="w-full rounded-xl bg-[#13221a] border border-emerald-500/30 text-white placeholder-gray-500 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Course description"
              rows={4}
              className="w-full rounded-xl bg-[#13221a] border border-emerald-500/30 text-white placeholder-gray-500 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
            />
          </div>

          {/* Category / Level / Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl bg-[#13221a] border border-emerald-500/30 text-white px-4 py-3 pr-9
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer text-sm">
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#13221a]">
                      {cat}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Course Level
              </label>
              <div className="relative">
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full appearance-none rounded-xl bg-[#13221a] border border-emerald-500/30 text-white px-4 py-3 pr-9
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer text-sm">
                  <option value="" disabled>
                    Select Level
                  </option>
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl} className="bg-[#13221a]">
                      {lvl}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price (INR)
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full rounded-xl bg-[#13221a] border border-emerald-500/30 text-white placeholder-gray-500 pl-9 pr-4 py-3
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Thumbnail
            </label>
            <label className="relative block w-full sm:w-64 aspect-video rounded-xl border-2 border-dashed border-emerald-500/30 bg-[#13221a] hover:bg-[#17281f] transition-colors cursor-pointer overflow-hidden group">
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImagePlus
                    className="w-10 h-10 text-emerald-500/40"
                    strokeWidth={1.5}
                  />
                </div>
              )}
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#0a140f]/80 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="w-4 h-4" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Cancel / Save */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl px-6 py-3 text-sm font-semibold bg-[#13221a] text-gray-300 border border-emerald-500/20 hover:bg-[#17281f] transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || isSaving || isPublishing || isDeleting}
              className="rounded-xl px-8 py-3 text-sm font-semibold bg-linear-to-r from-green-500 to-emerald-500 text-white
                shadow-[0_8px_30px_-8px_rgba(34,197,94,0.5)] hover:scale-[1.02] transition-transform
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}