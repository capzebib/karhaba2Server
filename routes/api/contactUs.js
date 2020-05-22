const express = require("express");
const router = express.Router();
const ContactUs = require("../../models/ContactUs");

// SEND AMESSAGE
router.post("/",(req, res, next) => {
  const { name, phone, email, subject, message } = req.body;
  console.log(req.body);
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.secure_url;
    
  }

  ContactUs
  .create(req.body)
.then(contactUsDocument => {
      res.status(201).json(contactUsDocument);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
