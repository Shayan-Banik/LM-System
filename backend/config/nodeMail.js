import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD, // app password(gmail)
  },
});

const sendMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL, // sender address
      to: to, // list of recipients
      subject: "Reset Your Password",
      html: `<p>Your OTP for password Reset is: ${otp} </b>. It is expired in 5 minutes </p>`,
    });
  } catch (err) {
    console.error("Error while sending mail:", err);
    throw err;
  }
};

export default sendMail;