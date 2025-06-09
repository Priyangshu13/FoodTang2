import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "Yes" : "No");
  console.log("Token received in header:", token);

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

export default authMiddleware;
