const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    }
})
module.exports = mongoose.model('Users', UserSchema)

