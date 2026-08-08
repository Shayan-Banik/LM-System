import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { serverUrl } from "../config";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { signInWithPopup, setPersistence, inMemoryPersistence } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

import { auth, provider } from "../utils/firebashAuth.js";
import logo from "../assets/logo.webp";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name,
          email,
          password,
          role,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(setUserData(response.data));

      console.log("Sign up successful:", response.data);

      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error signing up. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await setPersistence(auth, inMemoryPersistence);
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          name: user.displayName || "Google User",
          email: user.email,
          role,
          photoUrl: user.photoURL || "",
        },
        {
          withCredentials: true,
        },
      );

      dispatch(setUserData(result.data.user));
      toast.success("Signed in successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error(
        error.response?.data?.message ||
          "Error signing up with Google. Please try again.",
      );
    }
  };

  return (
    <div className="bg-[#dddddd] w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSignUp}
        className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex justify-center items-center">
        {/* Left */}
        <div className="md:w-[50%] w-full h-full flex flex-col justify-center items-center gap-4 bg-white">
          <div className="">
            <h1 className="font-semibold text-center">Let's Get Started</h1>
            <h2 className="text-[#999797] text-[18px]">Create Your Account</h2>
          </div>

          <div className="flex flex-col gap-3 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="text-[14px]">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full h-10 rounded-md border border-[#999797] px-3 outline-none"
            />
            <label htmlFor="email" className="text-[14px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-10 rounded-md border border-[#999797] px-3 outline-none"
            />
            <div className="relative w-full">
              <label htmlFor="password" className="text-[14px]">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-10 rounded-md border border-[#999797] px-3 outline-none"
              />

              {showPassword ? (
                <IoEyeOutline
                  onClick={() => setShowPassword(false)}
                  className="absolute right-[5%] bottom-[16%] w-5 cursor-pointer"
                />
              ) : (
                <IoEye
                  onClick={() => setShowPassword(true)}
                  className="absolute right-[5%] bottom-[16%] w-5 cursor-pointer"
                />
              )}
            </div>
          </div>

          <div className="flex md:w-[50%] w-[70%] items-center justify-between">
            <span
              onClick={() => setRole("student")}
              className={`px-2.5 py-1.25 border border-[#e7e6e6] rounded-2xl cursor-pointer ${role === "student" ? "bg-black text-white" : ""}`}>
              Student
            </span>
            <span
              onClick={() => setRole("educator")}
              className={`px-2.5 py-1.25 border border-[#e7e6e6] rounded-2xl cursor-pointer ${role === "educator" ? "bg-black text-white" : ""}`}>
              Educator
            </span>
          </div>

          <div className="w-[80%] px-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-5 py-2 rounded-md">
              {loading ? <ClipLoader color="#ffffff" size={20} /> : "Sign Up"}
            </button>
          </div>

          <div className="w-[80%] px-3 flex items-center justify-between">
            <span className="w-[23%] h-px bg-[#999797]"></span>
            <span className="text-[#999797] text-[14px]">Or continue with</span>
            <span className="w-[23%] h-px bg-[#999797]"></span>
          </div>

          <div className="w-[80%] px-3">
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="w-full bg-white  border border-[#999797] text-red-500 px-5 py-2 rounded-md cursor-pointer">
              Google
            </button>
          </div>

          <div className="flex gap-2">
            <span className="text-[#999797] text-[14px]">
              Already have an account?
            </span>
            <span
              onClick={() => navigate("/login")}
              className="text-[#000000] text-[14px] font-semibold cursor-pointer">
              Sign In
            </span>
          </div>
        </div>
        {/* RIght */}
        <div className=" md:w-[50%] w-full h-full rounded-r-2xl bg-black md:flex  items-center justify-center flex-col hidden">
          <img src={logo} alt="" className="w-50 h-30" />
          <span className="text-white text-2xl">VIRTUAL COURSES</span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
