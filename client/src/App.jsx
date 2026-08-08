import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import useGetCurrentUser from "./hook/getCurrentUser.js";
import Profile from "./pages/Profile.jsx";
import ForgetPassword from "./pages/ForgetPassword";

const App = () => {
  useGetCurrentUser();
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
      </Routes>
    </>
  );
};

export default App;
