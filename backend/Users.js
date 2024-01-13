

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false } // Added isAdmin field with default value of false
});

module.exports = mongoose.model("users", UserSchema);
