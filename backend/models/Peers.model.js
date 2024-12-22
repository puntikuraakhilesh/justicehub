const mongoose = require('mongoose');

const peersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
        unique: true, // Ensure each user has only one peers document
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        },
    ],
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const Peers = mongoose.model('Peers', peersSchema);

module.exports = Peers;
