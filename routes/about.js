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
    console.log(req.body)
    // try {
        
    // } catch (error) {
    //     console.log(error)
    //     res.send(error)
    // }
})

module.exports = router