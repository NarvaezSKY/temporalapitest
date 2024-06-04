import Jwt from "jsonwebtoken";

import { TOKEN_SECRET } from "../config/Token.js";

export const AuthRequired = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ message: "No token provided" });
  Jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
