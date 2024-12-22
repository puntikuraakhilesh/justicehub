const Peers = require('../models/Peers.model');
const User = require('../models/User.model');

const getUserPeersAction = async (req, res) => {
    try {
        const { userid } = req.params;

        // Validate user ID
        if (!userid) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the peers document for the user
        const userPeers = await Peers.findOne({ user_id: userid }).populate('friends', 'username email role');

        if (!userPeers) {
            return res.status(404).json({ message: 'No peers found for this user' });
        }

        // Return the user's friends
        res.status(200).json({
            message: 'Peers fetched successfully',
            peers: userPeers.friends,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUserPeersAction };
