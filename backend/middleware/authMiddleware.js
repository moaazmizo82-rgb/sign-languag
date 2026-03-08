import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role }; // include role
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
