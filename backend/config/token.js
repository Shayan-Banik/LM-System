import jwt from "jsonwebtoken";

const generateToken = (id) => {
  try {
      return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, { expiresIn: "7d" });
  } catch (error) {
      console.log(error);
  }
};

export default generateToken;
