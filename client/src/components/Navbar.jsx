import { IoPersonCircleSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../assets/logo.webp";
import { serverUrl } from "../config";
import { setUserData } from "../redux/userSlice";
import { useState } from "react";
const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(setUserData(null)); // Clear user data from Redux store
      console.log("Logout successful:", response.data);
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error logging out. Please try again.",
      );
    }
  };

  return (
    <div>
      <div className="w-full h-17.5 fixed top-0 px-5 py-2.5 flex items-center justify-between bg-[#00000047] z-10 ">
        {/* left Nav */}
        <div className="lg:w-[20%] w-[40%] lg:pl-12.5 ">
          <img
            src={logo}
            alt=""
            className="w-12.5 rounded-full border border-green-500 "
          />
        </div>

        {/* right Nav */}
        <div className="w-[30%] hidden lg:flex items-center justify-center gap-4">
          {!userData && (
            <IoPersonCircleSharp className="w-12.5 h-12.5 cursor-pointer fill-white" />
          )}

          {userData && !userData?.photoUrl ? (
            <div
              onClick={() => setShowProfile(!showProfile)}
              className="w-12.5 h-12.5 rounded-full bg-black border border-green-500 flex items-center justify-center text-white text-[20px] font-semibold cursor-pointer ">
              {userData?.name.charAt(0).toUpperCase()}
            </div>
          ): (
            <img
              src={userData?.photoUrl}
              alt=""
              className="w-12.5 h-12.5 rounded-full cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            />
          ) 
          }

          {userData?.role === "educator" && (
            <div className="px-5 py-2.5 border border-green-500 text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer ">
              Dashboard
            </div>
          )}
          {!userData && (
            <span
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">
              Login
            </span>
          )}

          {showProfile && userData && (
            <div className="absolute top-18 right-16 w-70 rounded-2xl bg-black text-white shadow-xl border border-zinc-800 py-3">
              <div className="flex flex-col">
                <div className="w-full min-w-0 px-5 py-3 border-b border-zinc-800">
                  <div className="font-semibold text-sm sm:text-base truncate">
                    {userData.name}
                  </div>

                  <div className="text-xs sm:text-sm text-zinc-400 break-words overflow-hidden">
                    {userData.email}
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowProfile(false);
                  }}
                  className="px-5 py-3 text-left hover:bg-zinc-800 transition-colors">
                  My Profile
                </button>

                <button className="px-5 py-3 text-left hover:bg-zinc-800 transition-colors">
                  My Courses
                </button>

                <button
                  onClick={handleLogout}
                  className="px-5 py-3 text-left text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <GiHamburgerMenu
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden w-9 h-9 cursor-pointer text-white"
        />

        {showMobileMenu && (
          <div className="absolute top-17.5 right-3 w-70 rounded-xl mt-1 bg-black text-white shadow-xl border border-zinc-800 py-2 lg:hidden">
            {!userData ? (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMobileMenu(false);
                }}
                className="w-full px-5 py-3 text-left hover:bg-zinc-800 transition-colors">
                Login
              </button>
            ) : (
              <>
                <div className="px-5 py-3 border-b border-zinc-800">
                  <div className="font-semibold">{userData.name}</div>
                  <div className="text-sm text-zinc-400">{userData.email}</div>
                </div>

                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-zinc-800 transition-colors">
                  My Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/my-courses");
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-zinc-800 transition-colors">
                  My Courses
                </button>

                {userData.role === "educator" && (
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-5 py-3 text-left hover:bg-zinc-800 transition-colors">
                    Dashboard
                  </button>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-5 py-3 text-left text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
