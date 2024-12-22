const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    incident_type: {
        type: String,
        required: true
    },
    incident_description: {
        type: String,
        required: true
    },
    incident_location: {
        type: String,
        required: true
    },
    date_reported: {
        type: Date,
        default: Date.now
    },
    case_status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    advocate_assigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});



const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
