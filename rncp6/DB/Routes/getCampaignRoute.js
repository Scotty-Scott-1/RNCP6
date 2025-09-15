const express = require("express");
const Campaign = require("../Models/Campaign");
const router = express.Router();
const verifyAccessToken = require("./checkAcessTokenBackend.js")

router.get("/api/campaign/get", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id; // set by authenticateToken middleware
    const campaigns = await Campaign.find({ createdBy: userId }).populate("mailingList", "listName")

    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;

