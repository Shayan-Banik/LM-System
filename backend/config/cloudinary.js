import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// console.log({
//   cloudName: process.env.CLOUDINARY_NAME,
//   apiKey: process.env.CLOUDINARY_API_KEY,
//   secretExists: !!process.env.CLOUDINARY_SECRET,
// });


// try {
//   const result = await cloudinary.api.ping();
//   console.log("Cloudinary connected:", result);
// } catch (error) {
//   console.error("Cloudinary connection error:", error);
// }


const uploadOnCloudinary = async (filePath) => {
  
  try {
    if (!filePath) return null;

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return uploadResult.secure_url;
  } catch (error) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};

export default uploadOnCloudinary;
