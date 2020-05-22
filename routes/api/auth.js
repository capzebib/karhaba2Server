const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const upload = require("../../config/cloudinaryConfig");

const salt = 10;

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(userDocument => {
    if (!userDocument) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isValidPassword = bcrypt.compareSync(password, userDocument.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const userObj = userDocument.toObject();
    delete userObj.password;
    req.session.currentUser = userObj;
    res.status(200).json(userObj);
  });
});

router.post("/signup", upload.single("photo"), (req, res, next) => {
  console.log("je suis ici");
  const {
    email,
    password,
    firstname,
    lastname,
    username,
    gender,
    birth
  } = req.body;

  console.log(req.body, "this is req body");
  User.findOne({ email }).then(userDocument => {
    if (userDocument) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      email,
      password: hashedPassword,
      firstname,
      lastname,
      username,
      gender,
      birth
    };
    if (req.file) {
      newUser.photo = req.file.secure_url;
    }

    User.create(newUser).then(newUserDocument => {
      const userObj = newUserDocument.toObject();
      delete userObj.password;
      req.session.currentUser = userObj;
      res.status(201).json(userObj);
    });
  });
});

router.get("/isLoggedIn", (req, res, next) => {
  if (req.session.currentUser) {
    const id = req.session.currentUser._id;
    User.findById(id)
      .then(userDocument => {
        const userObj = userDocument.toObject();
        delete userObj.password;
        res.status(200).json(userObj);
      })
      .catch(error => {
        res.status(401).json(error);
      });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function(error) {
    if (error) res.status(500).json(error);
    else res.status(200).json({ message: "Succesfully disconnected." });
  });
});

module.exports = router;
