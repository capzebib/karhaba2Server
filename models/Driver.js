const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  photo: {
    type: String,
    default: "/images/avatar-driverMan.png"
  },
  email: String,
  username: String,
  gender: {
    type: String,
    enum: ["man", "woman"]
  },
  firstname: String,
  lastname: String,
  password: String
});

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;

// var UserSchema = new Schema({
//     "name":String,
//     "gender":String,
// });

// UserSchema.pre('save', function(next) {
//   if (this.gender === 'male') {
//     this.image = 'Some value';
//   } else {
//     this.image = 'Other value';
//   }

//   next();
// });

// const defaultImage=()=>{
//     if (gender="man"){
//         return ("../public/images/avatar-driverMan.png")
//     } else {
//         return("../public/images/avatar-driverWoman.png")
//     }
// }
