require("dotenv").config();
const express = require("express");
const connectDB = require("./connect");

const app = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

const PORT = 3000;
connectDB();

app.use(express.json());

const userRoutes = require("./DB/Routes/userRoute");
app.use("/api", userRoutes);




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


