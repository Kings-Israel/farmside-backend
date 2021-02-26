const express = require('express');
const { fstat } = require('fs');
const multer = require("multer");
const path = require("path");
const fs = require('fs')
const PortfolioImages = require('../models/PortfolioImages')
const router = express.Router()

const storage = multer.diskStorage({
    destination: './public/portfolio/images',
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
  }).array('images', 5);
  
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

router.post("/images", (req, res) => {
try {
    upload(req, res, async (err) => {
    if (err) {
        res.send({ message: "Error" });
    } else {
        if (req.files === undefined) {
        res.send({ message: "Undefined" });
        } else {
        req.files.forEach(async (file) => {
            await PortfolioImages.create({
            originalName: file.originalname,
            fileName: file.filename,
            });
        });
        const images = await PortfolioImages.find()
        res.send({ message: "success", images: images });
        }
    }
    });
} catch (error) {
    console.log(error);
    res.send(error);
}
});

router.delete('/:name', async (req, res) => {
    try {
        fs.unlink(`./public/portfolio/images/${req.params.name}`, async (err) => {
            if (err) {
                console.log(err)
                res.send('error')
                return
            }
            await PortfolioImages.deleteOne({fileName: req.params.name})
            const images = await PortfolioImages.find()
            res.send({message: 'success', images: images})
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/images', async (req, res) => {
    const images = await PortfolioImages.find()
    res.send(images)
})

module.exports = router