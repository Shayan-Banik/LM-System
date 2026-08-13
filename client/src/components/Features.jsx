import { BookOpen, Sparkles, BadgeDollarSign, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    sub: "10k+ Online Courses",
  },
  {
    icon: Sparkles,
    sub: "Lifetime Validity",
  },
  {
    icon: BadgeDollarSign,
    sub: "Value for money",
  },
  {
    icon: Users,
    sub: "Community support",
  },
];

const Features = () => {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <div
            key={index}
            className="flex justify-around gap-4 px-4 py-3 sm:px-8 sm:py-4 bg-linear-to-r from-[#13162a] via-emerald-600/25 to-[#13162a] backdrop-blur-sm border border-emerald-500/20 shadow-lg shadow-emerald-900/30 rounded-full">
            <div className="flex gap-1">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 shrink-0" />

              <span className="text-white text-xs sm:text-sm md:text-base">
                {feature.sub}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Features;
