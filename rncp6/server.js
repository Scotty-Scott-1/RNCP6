// server.js
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const connectDB = require("./connect");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Init
const app = express();
const PORT = 5001;

// HTTPS certificate options
const options = {
  key: fs.readFileSync("./certs/server.key"),    // your private key
  cert: fs.readFileSync("./certs/server.crt"),   // your certificate
};

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: "https://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Routes
const userRoutes = require("./DB/Routes/users");
const authRoutes = require("./DB/Routes/auth");
const checkTokenRoutes = require("./DB/Routes/checkAccessToken");
const refreshTokenRoutes = require("./DB/Routes/refreshAccessToken");
const newcampaign = require("./DB/Routes/newCampaignRoute.js");

app.use(userRoutes);
app.use(authRoutes);
app.use(checkTokenRoutes);
app.use(refreshTokenRoutes);
app.use(newcampaign);

// Start HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`✅ HTTPS Server running at https://localhost:${PORT}`);
});
