const express = require('express')
const Bookings = require('../models/Bookings')
const router = express.Router()

router.get('/bookings', async (req, res) => {
    try {
        let bookings = await Bookings.find({}).sort({booking_date: 'descending'}).lean()
        res.send({bookings})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
router.get('/booking/:id', async (req, res) => {
    try {
        const booking = await Bookings.findOne({_id: req.params.id})
        res.send({booking})
    } catch (error) {
        console.log(error)
        req.send(error)
    }
})
router.delete('/delete/:id', async (req, res) => {
    try {
        await Bookings.deleteOne({_id: req.params.id})
        const bookings = await Bookings.find({}).sort({booking_date: 'descending'}).lean()
        res.send({message: 'Booking deleted', bookings})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
router.post('/book', (req, res) => {
    try {
        const booking = new Bookings({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            location: req.body.location,
            event_date: req.body.event_date,
            event_type: req.body.event_type,
            event_duration: req.body.event_duration,
            event_details: req.body.event_details,
        })

        if (booking.save()) {
            res.send({message: 'success'})
        } else {
            res.send({message: 'error'})
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = router