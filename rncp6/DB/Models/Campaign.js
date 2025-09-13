const mongoose = require("mongoose");

/*
	const [campaignName, setCampaignName] = useState("");
	const [desciption, setDescirption] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [selectMailingList, setSelectMailingList] = useState("");
	const [emailSenderName, setEmailSenderName] = useState("");
	const [emailTemplate, setEmailTemplate] = useState("");
	const [landingPageTemplate, setLandingPageTemplate] = useState("");
	const [landingPage, setLandingPage] = useState(false);
*/

const userSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Campaign", userSchema);
