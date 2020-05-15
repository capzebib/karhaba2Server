var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const upload = require("../../config/cloudinaryConfig");

// GET ALL USERS
router.get("/api/users", function(req, res, next) {
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
router.get("/api/users/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

// CREATE ONE USER
router.post("/api/users", upload.single("image"), (req, res, next) => {
  const { name, category, quantity, description, location } = req.body;
  console.log(req.body);
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.secure_url;
  }

  // User.create(newUser)
  user
    .create(req.body)
    .then(userDocument => {
      res.status(201).json(userDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE USER
router.patch("/api/users/:id", (req, res, next) => {
  // Validate req body before updating maybe ?
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(userDocument => {
      res.status(200).json(userDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE USER
router.delete("/api/user/:id", (req, res, next) => {
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
