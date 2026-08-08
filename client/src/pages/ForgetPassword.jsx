import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

import { serverUrl } from "../config";


const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // for step 1: send OTP

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true },
      );
      console.log("OTP sent successfully:", response.data);
      setStep(2);

      toast.success("OTP sent successfully. Please check your email.");

    }catch(error){
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // for step 2: verify OTP

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true },
      );
      console.log("OTP verified successfully:", response.data);
      setStep(3);

      toast.success("OTP verified successfully. Please reset your password.");

    }catch(error){
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // for step 3: reset password

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if(newPassword !== confirmPassword){
      toast.error("Passwords do not match. Please try again.");
      return;
    }
    setLoading(true);
    try{
      const response = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, password: newPassword },
        { withCredentials: true },
      );
      console.log("Password reset successfully:", response.data);
      toast.success("Password reset successfully. Please login with your new password.");
      navigate("/login");
    }catch(error){
      console.error("Error resetting password:", error);
      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4">
      {/* Step 1 */}
      {step === 1 && (
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>
          <form onSubmit={handleSendOTP}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="your@example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              {loading ? <ClipLoader color="#fff" size={30} /> : "Send OTP"}
            </button>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Remember your password? </span>
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-[14px] text-gray-500 mb-2">
                Please enter the OTP sent to your email address
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="* * * *"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              {loading ? <ClipLoader color="#fff" size={30} /> : "Verify OTP"}
            </button>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Didn't receive the OTP? </span>
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setStep(1)}>
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="*************"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="*************"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              {loading ? <ClipLoader color="#fff" size={30} /> : "Reset Password"}
            </button>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Remember your password? </span>
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
