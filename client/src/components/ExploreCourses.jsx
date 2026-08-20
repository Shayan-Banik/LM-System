import { Monitor, Box, Smartphone, ShieldCheck, Brain, GitBranch, BarChart3, Boxes, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const courses = [
  { icon: Monitor, label: "Web Development" },
  { icon: Box, label: "UI UX Designing" },
  { icon: Smartphone, label: "App Development" },
  { icon: ShieldCheck, label: "Ethical Hacking" },
  { icon: Brain, label: "AI/ML" },
  { icon: GitBranch, label: "Data Science" },
  { icon: BarChart3, label: "Data Analytics" },
  { icon: Boxes, label: "AI Tools" },
];

export default function ExploreCourses() {
    const navigate = useNavigate();
  return (
    <section className="relative bg-[#0a140f] py-16 sm:py-20 px-4 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(34,197,94,0.12),transparent)]" />

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] gap-12 lg:gap-16 items-start">
        
        {/* Left text column */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Explore
            <br />
            <span className="text-green-400">Our Courses</span>
          </h2>

          <p className="text-gray-400 mt-6 text-base leading-relaxed max-w-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem vel
            iure explicabo laboriosam accusantium expedita laudantium facere
            magnam.
          </p>

          <button
            type="button"
            onClick={() => navigate("")}
           className="group inline-flex items-center gap-2 mt-8 rounded-full bg-linear-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(34,197,94,0.5)] hover:scale-[1.03] transition-transform">
            Explore Courses
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Right course grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" strokeWidth={1.75} />
                </div>
                <span className="mt-3 text-xs sm:text-sm text-gray-300 font-medium">
                  {course.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}