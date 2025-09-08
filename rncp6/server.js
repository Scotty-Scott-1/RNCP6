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

app.use(express.json());
app.use(cookieParser());


// Mount routes
const userRoutes = require("./DB/Routes/users");
const authRoutes = require("./DB/Routes/auth");

app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
