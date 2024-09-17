const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoute = require("./router/user-route");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());

connectDB();

app.use(cors());
app.use("", userRoute);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
})