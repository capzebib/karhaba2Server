var express = require("express");
var router = express.Router();
const Course = require("../../models/Course");
const upload = require("../../config/cloudinaryConfig");

// GET ALL COURSES
router.get("/api/courses", function(req, res, next) {
  Course.find()
    .then(dbRes => {
      res.status(200).json(dbRes);
      console.log(dbResp);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
      console.log(dbErr);
    });
});

// GET ONE COURSE
router.get("/api/courses/:id", (req, res, next) => {
  Course.findById(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

// CREATE ONE COURSE
router.post("/api/courses", upload.single("image"), (req, res, next) => {
  const {type, time, startAddress, finishAddress, date, price, isFinished: Boolean} = req.body;
  console.log(req.body);
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.secure_url;
  }
  // Course.create(newUser)
  course
    .create(req.body)
    .then(courseDocument => {
      res.status(201).json(courseDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE COURSE
router.patch("/api/courses/:id", (req, res, next) => {
  // Validate req body before updating maybe ?
  Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(courseDocument => {
      res.status(200).json(courseDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE USER
router.delete("/api/user/:id", (req, res, next) => {
  Course.findByIdAndRemove(req.params.id)
    .then(courseDocument => {
      if (courseDocument === null) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(204).json(courseDocument);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
