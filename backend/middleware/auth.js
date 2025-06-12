// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

// ✅ Middleware 1: Auth - verifies token and sets userId + role
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "Yes" : "No");
  console.log("Token received in header:", token);

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    req.body.role = decoded.role || 'user'; // Add role to request
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

// ✅ Middleware 2: Admin check - only allows admins
export const adminOnly = (req, res, next) => {
  if (req.body.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
  }
  next();
};
export default authMiddleware;