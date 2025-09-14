const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
	campaignName: String,
	description: String,
	startTime: String,
	endTime: String,
	selectMailingList: String,
	emailSenderName: String,
	emailTemplate: String,
	landingPageTemplate: String,
	landingPage: Boolean,
	createdBy: String
}, { versionKey: false });

module.exports = mongoose.model("Campaign", campaignSchema);
