const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    professional_summary: {
        type: String,
        required: true,
    },
    area_of_practice: {
        type: [String], // Array of strings to allow multiple specializations
        required: true,
    },
    education: {
        type: String, // You can make this more complex if you want an array of institutions/degrees
        required: true,
    },
    work_experience: {
        type: Number, // Summarized work experience details
        required: false,
        default:0
    },
    licences_certificates: {
        type: [String], // Array of licenses and certificates
        required: true,
    },
    case_studies: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    jurisdiction: {
        type: [String], // Array to allow multiple jurisdictions
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // To ensure the email is unique
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address',
        ],
    },
    phone_number: {
        type: String,
        required: true,
        match: [/^\d{10,15}$/, 'Please provide a valid phone number'], // Ensures valid phone number format
    },
    awards: {
        type: [String], // Array of awards
    },

    number_of_cases_handled: {
        type: Number,
        required: false,
        default: 0
    }
});

const Lawyer = mongoose.model('Lawyer', lawyerSchema);

module.exports = Lawyer;
