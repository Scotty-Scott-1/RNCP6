// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./connect");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5001;

connectDB();

app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}));

app.use(cookieParser());
app.use(express.json());


// Mount routes
const userRoutes = require("./DB/Routes/users");
const authRoutes = require("./DB/Routes/auth");
const checkTokenRoutes = require("./DB/Routes/checkAccessToken");
const refreshTokenRoutes = require("./DB/Routes/refreshAccessToken");
const newcampaign = require("./DB/Routes/newCampaignRoute.js");

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", checkTokenRoutes);
app.use("/api", refreshTokenRoutes);
app.use("/api", newcampaign);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
