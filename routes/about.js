const express = require("express");
const About = require("../models/About");
const multer = require("multer");
const path = require("path");
const AboutImages = require("../models/AboutImages");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./public/about",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("images", 3);

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.get("/aboutMain", async (req, res) => {
  try {
    let content = await About.findOne({ name: "aboutMainSection" });
    res.send({ content: content.content });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/aboutSub", async (req, res) => {
  try {
    let content = await About.findOne({ name: "aboutSubSection" });
    res.send({ content: content.content });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/updateMain", async (req, res) => {
  try {
    let mainAbout = await About.findOneAndUpdate(
      { name: req.body.name },
      { content: req.body.content },
      { new: true }
    );
    if (mainAbout) {
      res.send({ message: "success", main: mainAbout });
    } else {
      res.send({ message: "failed" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/updateSub", async (req, res) => {
  try {
    let subAbout = await About.findOneAndUpdate(
      { name: req.body.name },
      { content: req.body.content },
      { new: true }
    );
    if (subAbout) {
      res.send({ message: "success", sub: subAbout });
    } else {
      res.send({ message: "failed" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/images", (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        res.send({ message: "Error" });
      } else {
        if (req.files === undefined) {
          res.send({ message: "Undefined" });
        } else {
          let aboutImages = await AboutImages.find();
          if (aboutImages) {
            aboutImages.forEach(async (image) => {
              await AboutImages.deleteOne({ originalName: image.originalName });
            });
          }
          req.files.forEach(async (file) => {
            await AboutImages.create({
              originalName: file.originalname,
              fileName: file.filename,
            });
          });
          res.send({ message: "success" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/images", async (req, res) => {
  let imageNames = await AboutImages.find();
  res.send({ images: imageNames });
});
module.exports = router;
