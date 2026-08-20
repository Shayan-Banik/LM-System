
import { ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const courseProgressData = [
  { name: "Complete H...", value: 6 },
  { name: "Complete J...", value: 2 },
  { name: "Ultimate B...", value: 2 },
  { name: "Advanced C...", value: 2 },
  { name: "React M...", value: 2 },
  { name: "AI POWERED...", value: 3 },
  { name: "Node.js E...", value: 1 },
];

const enrollmentData = [
  { name: "Complete H...", value: 5 },
  { name: "Complete J...", value: 3 },
  { name: "Ultimate B...", value: 2 },
  { name: "Advanced C...", value: 1 },
  { name: "React M...", value: 2 },
  { name: "AI POWERED...", value: 1 },
];

function ChartCard({ title, data }) {
  return (
    <div className="bg-[#0f1a14]/90 backdrop-blur-sm border border-emerald-500/20 shadow-lg shadow-emerald-900/30 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.1)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={{ stroke: "rgba(34,197,94,0.2)" }}
              tickLine={false}
              interval={0}
              angle={0}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={{ stroke: "rgba(34,197,94,0.2)" }}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f1a14",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: "8px",
                color: "#fff",
              }}
              cursor={{ fill: "rgba(34,197,94,0.08)" }}
            />
            <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Dashboard() {

  const {userData} = useSelector((state) => state.user);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-[#0a140f] relative overflow-hidden px-4 sm:px-8 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_10%,rgba(34,197,94,0.12),transparent)]" />

      <div className="relative max-w-6xl mx-auto">

        {/* Top header card */}
        <div className="bg-[#0f1a14]/90 backdrop-blur-sm border border-emerald-500/20 shadow-lg shadow-emerald-900/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 sm:static text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 w-full pt-8 sm:pt-0">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shrink-0"
              />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-green-500 border-4 border-green-500 text-white text-3xl font-semibold shrink-0">
                {userData?.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}

            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome, {userData?.name || "Instructor"} 👋
              </h1>
              <p className="text-lg text-gray-300 mt-1">
                Total Earning :{" "}
                <span className="text-emerald-400 font-semibold">
                  ₹{userData?.totalEarning?.toLocaleString("en-IN") || "0"}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                {userData?.role || "Student"}
              </p>

              <button
                onClick={() => navigate("/courses")}
                className="mt-4 rounded-full bg-linear-to-r from-green-500 to-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(34,197,94,0.5)] hover:scale-[1.03] transition-transform cursor-pointer"
              >
                Create Courses
              </button>
            </div>
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ChartCard title="Course Progress (Lectures)" data={courseProgressData} />
          <ChartCard title="Student Enrollment" data={enrollmentData} />
        </div>

      </div>
    </div>
  );
}