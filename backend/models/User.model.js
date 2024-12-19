const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['lawyer', 'citizen'], // Ensures the value can only be 'lawyer' or 'citizen'
        default: 'citizen'
    },
    detailsfilled: {
        type: Boolean,
        required: true,
        default: false
    }
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare hashed password with plain text password
userSchema.methods.matchPassword = async function (enteredPassword) {
    console.log("User pwd : " + this.password);
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
