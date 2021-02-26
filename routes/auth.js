const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const multer = require('multer')
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });


router.post('/register/:id', (req, res) => {
    console.log({id: req.params.id, body: req.body.name})
    res.send('success')
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(req.body.password, salt, (err, hash) => {
    //         const newAdmin = new Admin({
    //             name: req.body.name,
    //             phone_number: req.body.phone_number,
    //             email: req.body.email,
    //             password: hash,
    //             profile_pic: req.file.filename
    //         })

    //         if (newAdmin.save()) {
    //             console.log(newAdmin)
    //             return res.send('Admin added')
    //         }

    //         return res.send('Error adding admin')
    //     })
    // })
})

router.post('/login', passport.authenticate('local'),
    function(req, res) {
        let token = jwt.sign({id: req.user.id}, 'farmside', { expiresIn: 86400})
        res.send({token: token, user: req.user})
    }
)

router.get('/logout', (req, res) => {
    req.logOut()
    return res.send()
})

module.exports = router