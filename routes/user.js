const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const Admin = require('../models/Admin')
const ProfilePic = require('../models/ProfilePic')

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './admin/profile_pics/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 5000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('image');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

router.get('/:id', (req, res) => {
  try {
    const admin = Admin.findById(req.params.id)
      .populate('')
  } catch (error) {
    console.log(error)
    res.send(error)
  }
    Admin.findById(req.params.id, (err, admin) => {
        if (err) {
            res.send(err)
        }
        res.send(admin)
    })
})

router.post('/updateInfo/:id', async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id).lean()
    
        if(!admin) {
            res.send('No User Found')
        } else {
            admin = await Admin.findOneAndUpdate({_id: req.params.id}, {
              'name': req.body.name,
              'email': req.body.email,
              'phone_number': req.body.phone_number
            }, {
                new: true
            })
    
            res.send(admin)
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/uploadImage/', (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        res.send({message: 'Error'})
      } else {
        if (req.file === undefined) {
          res.send({message: 'Undefined'})
        } else {
          try {
            let admin = await Admin.findOneAndUpdate({_id: req.body.id}, {'profile_pic': req.file.filename}, {returnOriginal: false}).lean()
            res.send(admin)
          } catch (error) {
            console.log(error)
            res.send(error)
          }
        }
      }
    })
})

module.exports = router