import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); 
    req.userId = decoded._id;
    next();
  } catch (err) {
    
    res.status(400).json({ error: "Invalid token." });
  }
};


export default auth;
