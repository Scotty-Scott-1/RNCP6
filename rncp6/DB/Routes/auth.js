// rncp6/DB/Routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../Models/User");



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
		// RETURN SUCCESS: If both checks pass success message*/
		res.status(200).json({ message: "Login successful", user: { id: userToCheck._id, username: userToCheck.username } });
	}
	// RETURN ERROR: If post request fails*/
	catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
