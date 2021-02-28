const mongoose = require('mongoose')
var d = new Date()
const SubscriptionSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date_subscribed: {
        type: String,
        default: `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
    }
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)