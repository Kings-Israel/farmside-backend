const express = require('express')
const Message = require('../models/Message')
const nodemailer = require('nodemailer')
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
    // try {
    //     const message = new Message({
    //         name: req.body.name,
    //         email: req.body.email,
    //         phone_number: req.body.phone_number,
    //         message: req.body.message
    //     })
        
    //     if (message.save()) {
    //         res.send({message: 'success'})
    //     } else {
    //         res.send({message: 'error'})
    //     }
    // } catch (error) {
    //     console.log(error)
    //     res.send(error)
    // }
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            password: process.env.PASSWORD,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    })

    var mailOptions = {
        from: process.env.EMAIL,
        to: 'kingsmilimo@yahoo.com',
        subject: `New message from ${req.body.from_name}`,
        text: `${req.body.message}\n Phone Number: ${req.body.phone_number} Email: ${req.body.email}`,
        replyTo: `${req.body.email}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send({message: 'Failed'})
            console.log(error)
        } else {
            console.log(info.response)
            res.send({message: 'success'})
        }
    })
})

module.exports = router