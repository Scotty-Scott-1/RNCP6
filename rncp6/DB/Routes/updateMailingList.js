const express = require("express");
const MailingList = require("../Models/MailingList");
const verifyAccessToken = require("./checkAcessTokenBackend.js");
const router = express.Router();

// Update mailing list
router.put("/api/mailinglist/update", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id; // from token
    const { id, listName, description } = req.body;

    if (!id || !listName || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find mailing list and check ownership
    const mailingList = await MailingList.findById(id);
    if (!mailingList) {
      return res.status(404).json({ message: "Mailing list not found" });
    }

    if (mailingList.createdBy !== userId) {
      return res.status(403).json({ message: "Not authorized to edit this list" });
    }

    // Update values
    mailingList.listName = listName;
    mailingList.description = description;

    await mailingList.save();

    res.status(200).json({message: "updated"});
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error updating mailing list" });
  }
});

module.exports = router;
