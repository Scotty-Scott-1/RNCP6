const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
	username: String,
	password: String,
	companyName: String,
	companyAddress: String,
	companyWebsite: String,
	agree: Boolean
}, { versionKey: false });

module.exports = mongoose.model("User", userSchema);
