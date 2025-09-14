const express = require("express");
const MailingList = require("../Models/MailingList"); // your mailing list model
const router = express.Router();
const verifyAccessToken = require("./checkAcessTokenBackend.js");

// GET all mailing lists owned by the authenticated user
router.get("/api/mailinglist/get", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id; // set by verifyAccessToken middleware
    const mailingLists = await MailingList.find({ createdBy: userId });
    res.json(mailingLists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
