import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    return res.status(401).json({ message: "Unauthorized, Provide a token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ge attach ra ang decoded sa user, ang user is ginama ra dli special keyword
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export default verifyToken;
