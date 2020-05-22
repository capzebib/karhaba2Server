require("dotenv").config();
const mongoose = require("mongoose");
const drivers = require("../models/Driver");

const drivers = [
  {
    email: "driver1@gmail.com",
    username: 007,
    gender: "man",
    firstname: James,
    lastname: Bond,
    password: 1234
  },
  {
    email: "driver2@gmail.com",
    username: "Obefa",
    gender: "woman",
    firstname: Niki,
    lastname: Minaj,
    password: 1234
  },
  {
    email: "driver3@gmail.com",
    username: "kung-fu master",
    gender: "man",
    firstname: "Bruce",
    lastname: "Lee",
    password: 1234
  }
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(self => {
    console.log(`Connected to ${self.connection.name}`);

    // Seeds
    Driver.create(drivers)
      .then(driver => {
        driver.forEach(driver => {
          console.log(driver.name);
        });
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(`Error occured while connecting to the Database ${err}`);
  });
