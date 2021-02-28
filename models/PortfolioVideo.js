const mongoose = require('mongoose')
const PortfolioVideoSchema = mongoose.Schema({
    originalName: {
        type: String
    },
    fileName: {
        type: String
    }
})

module.exports = mongoose.model('PortfolioVideo', PortfolioVideoSchema)