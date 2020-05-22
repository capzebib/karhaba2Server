var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const upload = require("../../config/cloudinaryConfig");
const { findOneAndUpdate } = require("../../models/User");
const Course = require("../../models/Course");
// GET ALL USERS
router.get("/", function(req, res, next) {
  User.find()
    .then(dbRes => {
      res.status(200).json(dbRes);
      console.log(dbResp);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
      console.log(dbErr);
    });
});

// GET ONE USER
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

// CREATE ONE USER
router.post("/", upload.single("photo"), (req, res, next) => {
  const {
    email,
    username,
    gender,
    firstname,
    lastname,
    birth,
    password
  } = req.body;
  console.log(req.body);
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.secure_url;
  }

  // User.create(newUser)
  User.create(req.body)
    .then(userDocument => {
      res.status(201).json(userDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE USER
// ("/api/users/");
router.patch("/", upload.single("photo"), (req, res, next) => {
  // Validate req body before updating maybe ?
  console.log("updated user", req.body);
  const updatedUser = req.body;
  if (req.file) {
    updatedUser.photo = req.file.secure_url;
  }
  User.findByIdAndUpdate(req.session.currentUser._id, updatedUser, {
    new: true
  })
    .then(userDocument => {
      res.status(200).json(userDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// /api/users/me/courses
router.get("/me/courses", (req, res) => {
  console.log(req);
  Course.find({ userID: req.session.currentUser._id })
    .populate("driverID")
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      console.log(dbErr);
      res.status(500).json(dbErr);
    });
  // Trouver dans le model course toutes les courses qui ont le meme id que le user dans la current session.
});

// DELETE USER
router.delete("/:id", (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(userDocument => {
      if (userDocument === null) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(204).json(userDocument);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
