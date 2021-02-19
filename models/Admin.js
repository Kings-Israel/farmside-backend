const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String
    },
    profile_pic: {
        type: String
    }
})

module.exports = mongoose.model('Admin', AdminSchema)