const express = require('express')
const Message = require('../models/Message')
const router = express.Router()

router.get('/messages', async (req, res) => {
    try {
        let messages = await Message.find().sort({date: 'descending'}).lean()
        res.send({messages})
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})

router.get('/message/:id', async (req, res) => {
    try {
        const message = await Message.findOne({_id: req.params.id})
        res.send({message})
    } catch (error) {
        console.log(error)
        req.send(error)
    }
})
router.delete('/delete/:id', async (req, res) => {
    try {
        await Message.deleteOne({_id: req.params.id})
        const messages = await Message.find({}).sort({date: 'descending'}).lean()
        res.send({message: 'Message deleted', messages})
    } catch (error) {
        console.log(error)
        res.send(error)
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