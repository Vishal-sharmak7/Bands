// routes/index.js
import express from "express";
const router = express.Router();

// Import the v1 router
import { router as v1Router } from "./v1/index.js";

// Mount the v1 router at the /v1 path
router.use("/v1", v1Router);

export { router };
