import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // swap for next/navigation if you're on Next.js
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../config";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

export default function EditProfile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(userData?.name || "");
  const [description, setDescription] = useState(userData?.description || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    userData?.photoUrl || null,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const email = userData?.email || "";

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // basic validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setError("");
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

const handleSaveChanges = async (e) => {
  e.preventDefault();

  if (!fullName.trim()) {
    setError("Full name can't be empty.");
    return;
  }

  setIsSaving(true);
  setError("");

  try {
    const formData = new FormData();

    formData.append("name", fullName.trim());
    formData.append("description", description.trim());

    // photoUrl is the field name expected by upload.single("photoUrl")
    if (avatarFile) {
      formData.append("photoUrl", avatarFile);
    }

    const response = await axios.post(
      `${serverUrl}/api/user/update-profile`,
      formData,
      {
        withCredentials: true,
      }
    );

    console.log("Updated user:", response.data);

    // Backend returns the updated user directly
    dispatch(setUserData(response.data));

    toast.success("Profile updated successfully!");
    navigate("/");
  } catch (err) {
    console.error("Profile update error:", err);
    console.error("Server response:", err.response?.data);

    setError(
      err.response?.data?.message ||
        "Something went wrong while saving. Please try again."
    );
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="w-full min-h-screen bg-[#0a140f] flex justify-center items-center px-4 relative overflow-hidden py-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(34,197,94,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(16,185,129,0.1),transparent)]" />

      <form 
      onSubmit={handleSaveChanges}
       className="relative bg-[#0f1a14]/90 backdrop-blur-sm border border-emerald-500/20 shadow-lg shadow-emerald-900/30 rounded-2xl p-6 max-w-xl w-full">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-0 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>

        {/* Avatar preview */}
        <div className="flex justify-center mb-8">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
            />
          ) : (
            <div className="w-28 h-28 rounded-full flex items-center justify-center bg-green-500 border-4 border-green-500 text-white text-3xl font-semibold">
              {fullName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2">
            {error}
          </div>
        )}

        {/* Select Avatar */}
        <div className="mb-5">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-300 mb-2">
            Select Avatar
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            name="photoUrl" // use the same name as the backend expects
            onChange={handleAvatarChange}
            className="w-full rounded-xl bg-[#13221a] border border-emerald-500/20 text-gray-300 text-sm
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
              file:bg-emerald-500/10 file:text-emerald-400 file:text-sm file:font-medium
              hover:file:bg-emerald-500/20 file:cursor-pointer cursor-pointer
              px-3 py-2"
          />
        </div>

        {/* Full Name */}
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl bg-[#13221a] border border-emerald-500/30 text-white px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Email (read-only) */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full rounded-xl bg-[#0d1712] border border-emerald-500/10 text-gray-400 px-4 py-3 cursor-not-allowed"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about yourself"
            rows={4}
            className="w-full rounded-xl bg-[#13221a] border border-emerald-500/20 text-white placeholder-gray-500 px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={isSaving}
          className="w-full rounded-xl bg-linear-to-r from-green-500 to-emerald-500 text-white font-semibold py-3
            shadow-[0_8px_30px_-8px_rgba(34,197,94,0.5)] hover:scale-[1.01] transition-transform
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
          {isSaving ? <ClipLoader size={30} color="#fff" /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
