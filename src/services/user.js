import express, { application } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { sendMail } from "../utils/commonfunction.js";

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, userName, email, phoneNumber, password } =
      req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const objToSave = {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password: hashedPassword, // store the hashed password instead of the raw one
    };

    // Insert user using Mongoose's create method
    const saveUser = await User.create(objToSave);
    if (!saveUser) throw new Error("Unable to save user!");

    return res
      .status(200)
      .json({ msg: "User saved successfully", data: saveUser, status: true });
  } catch (error) {
    return res.status(500).json({ msg: error.message, status: false });
  }
};

//! Login Route -
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email }).lean();
    if (!userExist) throw Error("User does not exist");
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!isPasswordCorrect) throw Error("Invalid credentials!");
    const accessToken = jwt.sign(
      {
        _id: userExist._id,
        email: userExist.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: userExist._id,
        email: userExist.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
    return res.status(200).json({
      msg: "User logged in successfully",
      data: { accessToken, refreshToken },
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message, status: false });
  }
};

//! User Details by ID -
export const userDetails = async (req, res) => {
  try {
    const userDetails = req.user;
    console.log(userDetails);
    const userData = await User.findById({ _id: userDetails._id }).lean();
    if (!userDetails) res.status(404).send("User not found!!");
    return res
      .status(200)
      .json({ msg: "User found", status: true, data: userData });
  } catch (error) {
    return res.status(500).json({ msg: error.message, status: false });
  }
};

//! Forget Password
export const forgetPassword = async (req, res) => {
  try {
    const generateToken = jwt.sign(
      {
        _id: req.user._id,
        email: req.user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const emailData = await User.findOne({ email: req.user.email }).lean();
    if (!emailData) res.status(400).send("Email not found!!");
    const link = `${process.env.BASE_URL}/v1/user/forgetPassword?accessToken=${generateToken}`;
    console.log(link);
    await sendMail(req.user.email);
  } catch (error) {
    return res.status(500).json({ msg: error.message, status: false });
  }
};

//! Logout
export const userLogout = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(decoded._id, {
      $set: {
        refreshToken: null,
      },
    });
    return res.status(200).json("user logged out successfully!");
  } catch (error) {
    return res.status(500).json({ msg: error.message, status: false });
  }
};
