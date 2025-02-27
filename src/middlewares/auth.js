import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
  const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;

  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied! No token provided." });
    }

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }
      req.user = decoded; // Attach user info to request object
      next(); // Proceed to the next middleware/controller
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
