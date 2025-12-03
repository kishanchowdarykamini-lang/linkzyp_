const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
// Enable CORS for your frontend
app.use(cors({
    origin: [
        "https://musical-paletas-a0f22a.netlify.app",
        "https://linkzyp-frontend.vercel.app/"
    ],
    credentials: true
}));
// Basic test route
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const linkRoutes = require("./routes/linkRoutes");
app.use("/links", linkRoutes);

app.get("/", (req, res) => {
    res.send("Linkzyp Backend is Running");
});

// Connect to MongoDB (will add URL later)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
