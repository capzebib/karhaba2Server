const express = require("express");
const router = express.Router();
const Driver = require("../../models/Driver");
const upload = require("../../config/cloudinaryConfig");

router.get("/", (req, res, next) => {
  Driver.find()
    .then(driverDocuments => {
      res.status(200).json(driverDocuments); 
        })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res, next) => {
  Driver.findById(req.params.id)
    .then(driverDocument => {
      res.status(200).json(driverDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", upload.single("picture"), (req, res, next) => {
  // Validate req body before creating.
  const { email, username, gender, firstname, lastname, password } = req.body;
  // You should really validate here
  const newDriver = {
    email,
    username,
    gender,
    firstname,
    lastname,
    password
  };
  if (req.file) {
    newDriver.photo = req.file.secure_url;
  }

  Driver.create(newDriver)
    .then(driverDocument => {
      res.status(201).json(driverDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.patch("/:id", (req, res, next) => {
  // Validate req body before updating maybe ?
  Driver.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(driverDocument => {
      res.status(200).json(driverDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res, next) => {
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
