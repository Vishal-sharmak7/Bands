import express from "express";
// import { bands } from "../../../services/bands";
import { bands } from "../../../services/bands.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Band home route");
});

router.get("/bands", async (req, res) => {
  console.log(12334);
  await bands(req, res);
});

export { router };
