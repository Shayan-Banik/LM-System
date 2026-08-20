import { FaStar } from "react-icons/fa6";

const CardCompo = ({ thumbnail, title, category, price,}) => {
  return (
    <div className="w-full bg-[#0f1a14]/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 shadow-lg shadow-emerald-900/30 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a140f]/60 to-transparent" />
      </div>

      <div className="p-5 space-y-3">
        <h2 className="text-lg font-semibold text-white line-clamp-1">
          {title}
        </h2>

        <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-medium capitalize">
          {category}
        </span>

        <div className="flex items-center justify-between text-sm mt-3">
          <span className="font-semibold text-white">₹{price}</span>
          <span className="flex items-center gap-1 text-gray-300">
            <FaStar className="w-4 h-4 text-yellow-400" />
            5
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardCompo;