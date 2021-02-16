const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const { ensureAuth } = require('../middlewares/auth')
const router = express.Router()

// router.post('/api/register', (req, res) => {
//     console.log(req.body.name)
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(req.body.password, salt, (err, hash) => {
//             const newAdmin = new Admin({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hash
//             })

//             if (newAdmin.save()) {
//                 console.log(newAdmin)
//                 return res.send('Admin added')
//             }

//             return res.send('Error adding admin')
//         })
//     })
// })

router.post('/api/login', passport.authenticate('local'),
    function(req, res) {
        let token = jwt.sign({id: req.user.id}, 'farmside', { expiresIn: 86400})
        res.send({token: token, user: req.user})
    }
)

router.get('/api/logout', (req, res) => {
    req.logOut()
    return res.send()
})

router.post('/api/user', (req, res) => {
    Admin.findOne({email: req.body.email}, (err, admin) => {
        if (err) {
            console.log(err)
        }
        res.send(admin)
    })
})

module.exports = router