const express = require('express')
const About = require('../models/About')
const router = express.Router()

router.get('/aboutMain', (req, res) => {
    res.send({aboutMain: aboutMain})
})

router.get('/aboutSub', (req, res) => {
    res.send({aboutSub: aboutSub})
})

router.post('/updateMain', async (req, res) => {
    try {
        let mainAbout = await About.findOneAndUpdate({name: req.body.name}, {content: req.body.content}, {new: true})
        if (mainAbout) {
            res.send({message:"success", main: mainAbout})
        } else {
            res.send({message: 'failed'})
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/updateSub', async (req, res) => {
    try {
        let subAbout = await About.findOneAndUpdate({name: req.body.name}, {content: req.body.content}, {new: true})
        if (subAbout) {
            res.send({message:"success", sub: subAbout})
        } else {
            res.send({message: 'failed'})
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = router