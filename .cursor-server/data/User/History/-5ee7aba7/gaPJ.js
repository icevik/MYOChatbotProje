const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    hostAddress: {
        type: String,
        required: true
    },
    chatbotId: {
        type: String,
        required: true
    },
    securityKey: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema); 