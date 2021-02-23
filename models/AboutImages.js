const mongoose = require('mongoose')
const AboutImageSchema = mongoose.Schema({
    originalName: {
        type: String
    },
    fileName: {
        type: String
    }
})

module.exports = mongoose.model('AboutImage', AboutImageSchema)