const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const auth = require("../middleware/auth");

// Helper → Detect platform from URL
function detectPlatform(url) {
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
    if (url.includes("facebook.com")) return "facebook";
    if (url.includes("linkedin.com")) return "linkedin";
    return "other";
}

// ➕ ADD LINK (with optional note)
router.post("/add", auth, async (req, res) => {
    try {
        const { url, note } = req.body;

        if (!url) {
            return res.status(400).json({ message: "URL is required" });
        }

        const platform = detectPlatform(url);

        const newLink = new Link({
            userId: req.user.userId,
            url,
            platform,
            note: note || "" // ✅ NEW
        });

        await newLink.save();

        res.json({
            success: true,
            message: "Link added",
            link: newLink
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// 📥 GET ALL LINKS FOR USER (includes notes)
router.get("/all", auth, async (req, res) => {
    try {
        const links = await Link.find({
            userId: req.user.userId
        }).sort({ createdAt: -1 });

        res.json({ links });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ❌ DELETE LINK
router.delete("/:id", auth, async (req, res) => {
    try {
        await Link.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        res.json({ success: true, message: "Link deleted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
