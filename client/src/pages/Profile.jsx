import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#0a140f] flex justify-center items-center px-4 relative overflow-hidden">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 cursor-pointer hover:bg-emerald-500/20 transition-colors z-10">
        ← Back
      </button>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(34,197,94,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(16,185,129,0.1),transparent)]" />

      <div
        className="relative bg-[#0f1a14]/90 backdrop-blur-sm border border-emerald-500/20 flex flex-col items-center shadow-lg shadow-emerald-900/30 rounded-2xl p-8 max-w-xl 
           w-full">
        {userData?.photoUrl ? (
          <img
            src={userData?.photoUrl}
            alt=""
            className="w-24 h-24 rounded-full object-cover border-4 border-green-500 "
          />
        ) : (
          <div className="w-24 h-24 rounded-full flex items-center justify-center bg-green-500 border-4 border-green-500 text-white text-3xl font-semibold">
            {userData?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}

        <h2 className="text-2xl font-bold mt-4 text-white">{userData?.name}</h2>
        <p className="text-gray-400">Role : {userData?.role}</p>

        <div className="w-full mt-4 text-left">
          <p className="text-gray-400">Email : {userData?.email}</p>

          {userData?.description ? (
            <p className="text-gray-300 text-sm mt-2 max-w-sm">
              Bio : {userData.description}
            </p>
          ) : (
            <p className="text-gray-300 text-sm mt-2 max-w-sm">
              Bio : No bio available
            </p>
          )}

          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
              Enrolled Courses : {userData?.enrolledCourses?.length || 0}{" "}
              Courses Enrolled
            </span>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="flex items-center justify-center mt-6 px-4 py-2 bg-green-500 text-white rounded-full active:bg-green-600 active:scale-95 transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/edit-profile")}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
