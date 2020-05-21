var express = require("express");
var router = express.Router();
const Course = require("../../models/Course");
const upload = require("../../config/cloudinaryConfig");

// GET ALL COURSES
router.get("/", function(req, res, next) {
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
router.get("/:id", (req, res, next) => {
  Course.findById(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

// CREATE ONE COURSE
router.post("/", (req, res, next) => {
  const {
    startAddress,
    finishAddress,
    date,
    price,
    duration,
    driverID
  } = req.body;
  console.log(req.body);
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.secure_url;
  }
  // trouver tous les drivers, en selectionner un aléatoirement, prendre son id,
  // pour pouvoir l'inserer dans le course.console
  const newCourse = {
    startAddress,
    finishAddress,
    date,
    driverID,
    duration,
    price,
    userID: req.session.currentUser._id
  };
  Course.create(newCourse)
    .then(courseDocument => {
      res.status(201).json(courseDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE COURSE
router.patch("/:id", (req, res, next) => {
  // Validate req body before updating maybe ?
  Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(courseDocument => {
      res.status(200).json(courseDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE COURSE
router.delete("/:id", (req, res, next) => {
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
