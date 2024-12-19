const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

const signupAction = async (req, res) => {
    try {
        // Destructure request body to get user details
        const { username, email, password, role } = req.body;

        // Validate the required fields
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the role is valid
        if (!['lawyer', 'citizen'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if the email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password,
            role,
            detailsfilled: false, // Default value
        });

        // Save the user to the database
        await user.save();

    
        // Send a success response with the token
        res.status(200).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                detailsfilled: user.detailsfilled,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};





const loginAction = async (req, res) => {
    try {
        // Destructure email, password, and role from the request body
        const { email, password, role } = req.body;

        // Validate the required fields
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the role is valid
        if (!['lawyer', 'citizen'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Find the user by email
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email, password, or role' });
        }

        // Match the provided password with the hashed password in the database
        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email, password, or role' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET, // Make sure to set JWT_SECRET in your environment variables
            { expiresIn: '1d' } // Token expires in 1 day
        );

        // Send success response with the token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                detailsfilled: user.detailsfilled,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



const logoutAction = (req, res) => {
    try {
        // Clear any cookies containing the token (if applicable)
        res.clearCookie('token');

        // Send a success response
        res.status(200).json({
            message: 'Logout successful',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signupAction,loginAction,logoutAction };
