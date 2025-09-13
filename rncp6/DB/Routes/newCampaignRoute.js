const express = require("express");
const Campaign = require("../Models/Campaign");
const router = express.Router();

router.post("/api/campaign/new", async (req, res) => {
	try {
		const campaign = new Campaign(req.body);
		await campaign.save();
		res.status(201).json(campaign);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;

