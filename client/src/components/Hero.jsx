import { Sparkles, ArrowUpRight, Users } from "lucide-react";
import background from "../assets/background.jpeg";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import Features from "./Features";
import ExploreCourses from "./ExploreCourses";
const Hero = () => {
  const learners = [
    {
      name: "Amir",
      role: "Product Designer",
      img: img1,
      tilt: "-rotate-2",
      lift: "translate-y-6",
      bg: "bg-[#f3d9d1]",
    },
    {
      name: "Diego",
      role: "Frontend Engineer",
      img: img2,
      tilt: "rotate-0",
      lift: "-translate-y-4",
      bg: "bg-[#e4defb]",
    },
    {
      name: "Malik",
      role: "Data Analyst",
      img: img3,
      tilt: "rotate-2",
      lift: "translate-y-10",
      bg: "bg-[#dcece3]",
    },
  ];
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0b14] text-white min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={background}
          alt=""
          className="h-full w-full object-cover opacity-45"
        />
        {/* <div className="absolute inset-0 bg-linear-to-b from-[#0a0b14] via-[#0a0b14]/85 to-[#0a0b14]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(139,92,246,0.25),transparent)]" /> */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0a140f] via-[#0a140f]/85 to-[#0a140f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(34,197,94,0.25),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-16 pb-10 text-center sm:pt-24">
        <span className="font-body mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-violet-200 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          AI-GUIDED SKILL PATHS
        </span>

        <h1 className="font-display max-w-4xl text-4xl font-bold leading-[1.1] sm:text-6xl md:text-7xl">
          Grow Your Skills to
          <br />
          Advance Your{" "}
          <span className="bg-linear-to-r from-green-400 via-green-400 to-green-400 bg-clip-text text-transparent">
            Career Path
          </span>
        </h1>

        <p className="font-body mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
          Curated courses and an AI mentor that meets you exactly where your
          next role begins.
        </p>

        <div className="font-body mt-9 flex flex-wrap items-center justify-center gap-4">
          <button className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/5">
            View All Courses
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(34,197,94,0.7)] transition-transform hover:scale-[1.03]">
            <Sparkles className="h-4 w-4" />
            Search With AI
          </button>
        </div>
      </div>

      {/* Learner "archway" band */}
      <div className="relative z-10 mx-auto mt-6 flex max-w-4xl items-end justify-center gap-3 px-6 pb-10 sm:gap-8 sm:pb-16">
        {learners.map((p) => (
          <div
            key={p.name}
            className={`relative w-1/3 shrink-0 transform transition-transform duration-500 ease-out hover:-translate-y-3 ${p.tilt} ${p.lift}`}>
            <div
              className={`aspect-3/4 w-full overflow-hidden rounded-t-[999px] rounded-b-2xl ring-4 ring-[#0a0b14] ${p.bg}`}>
              <img
                src={p.img}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Floating trust chip, overlapping the middle arch */}
        <div className="font-body pointer-events-none absolute left-1/2 top-6 hidden -translate-x-1/2 items-center gap-2 rounded-2xl border border-green-300/15 bg-[#0f1a14]/90 px-4 py-3 text-left shadow-2xl backdrop-blur-md sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/20 text-green-300">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">12,400+</p>
            <p className="mt-1 text-xs text-slate-400">
              learners moved up this year
            </p>
          </div>
        </div>
      </div>

      {/* Features we provide */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-16 pb-10 text-center sm:pt-2">
        <Features />
      </div>
        <ExploreCourses />
    </section>
  );
};

export default Hero;
