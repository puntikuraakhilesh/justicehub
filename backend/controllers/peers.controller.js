const Peers = require('../models/Peers.model');
const mongoose = require('mongoose');

const getUserPeersAction = async (req, res) => {
    try {
        const { userid } = req.params;

        // Check if userId is provided
        if (!userid || userid === "null") {
            return res.status(400).json({ message: "User ID is missing or invalid." });
        }

        // Validate if userId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ message: "Invalid User ID format." });
        }

        // Find the user's peers
        const userPeers = await Peers.findOne({ user_id: userid }).populate("friends", "username email");

        if (!userPeers) {
            return res.status(404).json({ message: "No peers found for this user." });
        }

        res.status(200).json({
            message: "Peers fetched successfully",
            peers: userPeers.friends,
        });
    } catch (error) {
        console.error("Error fetching peers:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getUserPeersAction };
