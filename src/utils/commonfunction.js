import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async function (email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sarthaktyagi797@gmail.com",
        pass: "flglumstexxjnzqg@", // Use App Password
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, // Dynamic recipient email
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Email sent successfully: ", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
