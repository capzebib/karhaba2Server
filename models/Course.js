const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
  type: {
    type: String,
    enum: ["simple", "hour"]
  },
  time: Number,
  startAddress: String,
  finishAddress: String,
  date: {
    type: Date,
    default: Date.now
  },
  price: Number,
  isFinished: Boolean,
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  driverID: { type: Schema.Types.ObjectId, ref: "Driver" }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;