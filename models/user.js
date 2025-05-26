const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,  
    email: String,
    password: String,
    role: String,
    photo: String || null,
})

const User = mongoose.model('User', userSchema);

module.exports = User;