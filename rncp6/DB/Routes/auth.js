// rncp6/DB/Routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../Models/User");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefreshsecret";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;


// RETURN SUCCESS: If both checks pass success message*/
router.post("/auth", async (req, res) => {
	// GET CREDENTIALS: From request body
	const { username, password } = req.body;
	console.log("Received login attempt:");
	try {
		// VALIDATE USERNAME: Check if username is in database*/
		const userToCheck = await User.findOne({ username });
		if (!userToCheck) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		// CHECK PASSWORD: Compare the provided password with the hashed password in the database*/
		const isMatch = await userToCheck.checkPassword(password);
		if (!isMatch) {
			// RETURN ERROR: If any of the above checks fail, return 401 Unauthorized*/
			return res.status(401).json({ error: "Invalid password" });
		}

		// RETURN SUCCESS: If both checks pass success message and create token*/
		const accessToken = jwt.sign(
			{ id: userToCheck._id, username: userToCheck.username },
			JWT_SECRET,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{ id: userToCheck._id },
			JWT_REFRESH_SECRET,
			{ expiresIn: "7d" } // long-lived
		);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // HTTPS in prod
			sameSite: "Strict",
			maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
		});

		res.status(200).json({
			message: "Login successful",
			user: { id: userToCheck._id,
			username: userToCheck.username },
			accessToken
		});

	}
	// RETURN ERROR: If post request fails*/
	catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});




router.post("/refresh_token", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: payload.id, username: payload.username },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});




module.exports = router;
