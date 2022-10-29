const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    hotel_name: { type: String, required: true, trim: true, lowercase: true, maxLength: 55, minLength: 3 },
    country: { type: String, required: true, trim: true, lowercase: true, maxLength: 55, minLength: 3 },
    city: { type: String, required: true, trim: true, lowercase: true, maxLength: 10, minLength: 8 },
    star: { type: String, required: true, trim: true, lowercase: true, validate: [isEmail] },
    user_login: { type: String, required: true, trim: true, lowercase: true, unique: true, maxLength: 1024, minLength: 3 },
    user_pass: { type: String, required: true, },
    role: { type: String, default: 'admin' },
}, { timestamps: true, });

module.exports = mongoose.model('Users', userSchema);