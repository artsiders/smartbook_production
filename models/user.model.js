const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true, trim: true, lowercase: true, maxLength: 55, minLength: 3 },
    lastname: { type: String, required: true, trim: true, lowercase: true, maxLength: 55, minLength: 3 },
    user_phone: { type: String, required: true, trim: true, lowercase: true, maxLength: 10, minLength: 8 },
    user_email: { type: String, required: true, trim: true, lowercase: true, validate: [isEmail] },
    user_login: { type: String, required: true, trim: true, lowercase: true, unique: true, maxLength: 1024, minLength: 3 },
    user_pass: { type: String, required: true, },
    role: { type: String, default: 'admin' },
}, { timestamps: true, });

// userSchema.pre("save", async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.user_pass = await bcrypt.hash(this.user_pass, salt);
//     next()
// })

module.exports = mongoose.model('Users', userSchema);