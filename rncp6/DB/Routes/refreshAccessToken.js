// rncp6/DB/Routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../Models/User");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefreshsecret";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;




router.post("/refresh_token", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(403).json({ message: "No token providedAAAA" });

  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: payload.id, username: payload.username },
      JWT_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({
		message: "Token refreshed",
		accessToken: newAccessToken
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});

module.exports = router;
