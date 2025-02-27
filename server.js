import express from "express";
import "dotenv/config";
import { connectDB } from "./src/config/db.js";
import { router as mainRouter } from "./src/routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3001;
app.use(cors());

app.use(bodyParser.json());

app.use(mainRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port  ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection fail!!!");
  });



  
// app.use(cors()); // Enable CORS
// app.use(express.json()); // Parse JSON requests

// // ✅ Fix: Add the Signup Route
// app.post("/Signup", (req, res) => {
//   console.log("Received signup data:", req.body);
//   res.status(201).json({ message: "Signup successful!" });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });