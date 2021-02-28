const express = require('express')
const Subcription = require('../models/Subscription')
const router = express.Router()

router.post('/email', async (req, res) => {
    const subscribe = await Subcription.create({email: req.body.email})
    if(subscribe){
        res.send('ok')
    }
})

module.exports = router