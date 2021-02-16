const mongoose = require('mongoose')
const BookingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    event_date: {
        type: Date,
        required: true
    },
    event_type: {
        type: String,
        required: true
    },
    event_duration: {
        type: String,
        required: true
    },
    event_details: {
        type: Object,
    }
})

module.exports = mongoose.model('Booking', BookingSchema)