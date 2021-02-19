const mongoose = require('mongoose')
const ProfilePicSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('ProfilePic', ProfilePicSchema)