const express = require("express");
const User = require("../Models/User");
const router = express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;

