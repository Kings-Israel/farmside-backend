const mongoose = require('mongoose')
const PortfolioImageSchema = mongoose.Schema({
    originalName: {
        type: String,
    },
    fileName: {
        type: String
    }
})

module.exports = mongoose.model('PortfolioImage', PortfolioImageSchema)