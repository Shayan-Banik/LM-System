import { useState } from "react";
import { useSelector } from "react-redux";
import { ArrowLeft, Search, SlidersHorizontal, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardCompo from "../components/CardCompo";

const categoryList = [
  "App Development",
  "AI/ML",
  "AI Tools",
  "Data Science",
  "Data Analytics",
  "Ethical Hacking",
  "UI UX Designing",
  "Web Development",
  "Others",
];

export default function AllCourses() {
  const { courseData } = useSelector((state) => state.course);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [aiSearch, setAiSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const filteredCourses =
    selectedCategories.length === 0
      ? courseData || []
      : (courseData || []).filter((c) =>
          selectedCategories.includes(c.category),
        );


  const FilterPanel = (
    <div className="bg-[#0f1a14]/90 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-4 shadow-lg shadow-emerald-900/30">
      {/* Search with AI */}
      <div className="relative mb-5">
        <input
          type="text"
          value={aiSearch}
          onChange={(e) => setAiSearch(e.target.value)}
          placeholder="Search with AI"
          className="w-full rounded-full bg-[#13221a] border border-emerald-500/20 text-white placeholder-gray-400 text-sm pl-4 pr-10 py-2.5
            focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
      </div>

      {/* Category checkboxes */}
      <div className="space-y-1">
        {categoryList.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-emerald-500/10 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="w-4 h-4 rounded accent-emerald-500 bg-[#13221a] border-emerald-500/30 cursor-pointer"
            />
            <span className="text-gray-300 text-sm">{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a140f] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(34,197,94,0.1),transparent)]" />

      <div className="relative flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-8 py-8 gap-8">

        {/* Top bar — back button + mobile filter trigger */}
        <div className="flex items-center justify-between lg:hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white font-semibold hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Courses
          </button>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium px-4 py-2 hover:bg-emerald-500/20 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
            {selectedCategories.length > 0 && (
              <span className="bg-emerald-500 text-[#0a140f] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {selectedCategories.length}
              </span>
            )}
          </button>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:w-64 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white font-semibold mb-4 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Filter by Category
          </button>
          {FilterPanel}
        </aside>

        {/* Mobile filter drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            />

            {/* Slide-in panel */}
            <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#0a140f] border-r border-emerald-500/20 p-5 overflow-y-auto animate-in slide-in-from-left duration-300">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold text-lg">
                  Filter by Category
                </h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {FilterPanel}

              <div className="flex gap-3 mt-5">
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold bg-[#13221a] text-gray-300 border border-emerald-500/20 hover:bg-[#17281f] transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-[0_8px_30px_-8px_rgba(34,197,94,0.5)]"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Course grid */}
        <div className="flex-1">
          {filteredCourses.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500 text-sm">
              No courses found for the selected filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <CardCompo
                  key={index}
                  thumbnail={course.thumbnail}
                  title={course.title}
                  category={course.category}
                  price={course.price}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}