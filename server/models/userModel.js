const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: true
      },
    phone: {
        type: String,
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid phone number'],
        required: false
    },
    street: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    postalCode: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    role: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
