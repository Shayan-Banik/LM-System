import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getCurrentUser Error: ${error.message}` });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, description } = req.body;

    let photoUrl;
    if(req.file){
      const imageUrl = await uploadOnCloudinary(req.file.path);
      if (!imageUrl) {
        return res.status(500).json({
          message: "Failed to upload image to Cloudinary",
        });
      }
      photoUrl = imageUrl;
    }
    const updateData = {
      name: name.trim(),
      description,
      photoUrl
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: `updateProfile Error: ${error.message}`,
    });
  }
};