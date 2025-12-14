const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    url: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        default: "other"
    },
    // ✅ NEW FIELD (optional note / tag)
    note: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Link", LinkSchema);
