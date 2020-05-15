var express = require("express");
var router = express.Router();
const Driver = require("../../models/Driver");
const upload = require("../../config/cloudinaryConfig");

// GET ALL DRIVERS
router.get("/api/drivers", function(req, res, next) {
  Driver.find()
    .then(dbRes => {
      res.status(200).json(dbRes);
      console.log(dbResp);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
      console.log(dbErr);
    });
});

// GET ONE DRIVER
router.get("/api/drivers/:id", (req, res, next) => {
  Driver.findById(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

// CREATE ONE DRIVER
router.post("/api/drivers", upload.single("image"), (req, res, next) => {
  const {
    photo,
    email,
    username,
    gender,
    firstname,
    lastname,
    password
  } = req.body;
  console.log(req.body);
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.secure_url;
  }
  // Course.create(newDriver)
  driver
    .create(req.body)
    .then(driverDocument => {
      res.status(201).json(driverDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE COURSE
router.patch("/api/drivers/:id", (req, res, next) => {
  // Validate req body before updating maybe ?
  Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(driverDocument => {
      res.status(200).json(driverDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE DRIVER
router.delete("/api/driver/:id", (req, res, next) => {
  Driver.findByIdAndRemove(req.params.id)
    .then(driverDocument => {
      if (driverDocument === null) {
        res.status(404).json({ message: "Driver not found" });
      } else {
        res.status(204).json(driverDocument);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
