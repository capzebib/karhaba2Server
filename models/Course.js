const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  duration: { hour: Number, min: Number },
  startAddress: String,
  finishAddress: String,
  date: {
    type: Date,
    default: Date.now
  },
  price: Number,
  isFinished: { type: Boolean, default: false },
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  driverID: { type: Schema.Types.ObjectId, ref: "Driver" }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
