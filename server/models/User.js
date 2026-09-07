const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {},
    bgmiId: {},
    email: {},
    password: {},
    role: {}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);