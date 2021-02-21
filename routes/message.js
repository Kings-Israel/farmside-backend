const express = require('express')
const Message = require('../models/Message')
const router = express.Router()

router.get('/message', async (req, res) => {
    try {
        let messages = await Message.find()
        res.send(messages)
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})

router.post('/message', (req, res) => {
    try {
        const message = new Message({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            message: req.body.message
        })
        
        if (message.save()) {
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