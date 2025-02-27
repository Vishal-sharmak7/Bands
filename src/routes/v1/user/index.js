// user/index.js
import express from "express";
import {
  signup,
  login,
  userDetails,
  forgetPassword,
} from "../../../services/user.js";
import { authToken } from "../../../middlewares/auth.js";

const router = express.Router();

// Define a sample route for the user endpoint
router.get("/", (req, res) => {
  res.send("User home route");
});

router.post("/signup", async (req, res) => {
  console.log("fbdgferggrgtrrtrrgtrgtgtrgrf", req.body);
  await signup (req, res);
});

router.post("/login", async (req, res) => {
  await login(req, res);
});

router.get("/getuserbyid", authToken, async (req, res) => {
  await userDetails(req, res);
});

router.post("/forgetPassword", authToken, async (req, res) => {
  await forgetPassword(req, res);
});

export { router };
