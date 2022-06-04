const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creating Schema
const userSchema = Schema(
    {
        firstname: {type: String, required: true, },
        lastname: {type: String, required: true},
        email: {type: String, required: true},
        dob: {type: Date, required: true},
        domain: {type: String},
        skills: {type: [String]}
    }
);

// Creating Model
const User = mongoose.model('User', userSchema);

module.exports = User;