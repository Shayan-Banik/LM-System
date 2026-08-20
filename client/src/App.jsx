import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import useGetCurrentUser from "./hook/getCurrentUser.js";
import Profile from "./pages/Profile.jsx";
import ForgetPassword from "./pages/ForgetPassword";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/Educator/Dashboard.jsx";
import CreateCourses from "./pages/Educator/CreateCourses";
import Courses from "./pages/Educator/Courses.jsx";
import useGetCreatorCourse from "./hook/getCreatorCourse.js";
import EditCourses from "./pages/Educator/EditCourses.jsx";
import AllCourses from "./pages/AllCourses.jsx";

const App = () => {
  useGetCurrentUser();
  useGetCreatorCourse();

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/edit-profile" element={userData ? <EditProfile /> : <Navigate to="/signup" />} />
        <Route path="/dashboard" element={userData?.role === "educator" ? <Dashboard /> : <Navigate to="/signup" />} />
        <Route path="/create-courses" element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to="/signup" />} />
        <Route path="/courses" element={userData?.role === "educator" ? <Courses /> : <Navigate to="/signup" />} />
        <Route path="/edit-course/:courseId" element={userData?.role === "educator" ? <EditCourses /> : <Navigate to="/signup" />} />
        <Route path="/all-courses" element={userData ? <AllCourses /> : <Navigate to="/signup" />} />
      </Routes>
    </>
  );
};

export default App;
