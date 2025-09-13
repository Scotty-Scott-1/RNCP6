const express = require("express");
const User = require("../Models/User");
const router = express.Router();

router.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

module.exports = router;

