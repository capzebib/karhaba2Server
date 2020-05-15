const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// const defaultImage=()=>{
//     if (gender="man"){
//         return ("../public/images/avatar-man.png")
//     } else {
//         return("../public/images/avatar-woman.png")
//     }
// }
const userSchema = new Schema({
  // const genderPhoto = gender;
  photo: {
    type: String,
    default: "/images/avatar-man.png",
  },
  email: String,
  username: String,
  gender: {
    type: String,
    enum: ["man", "woman"]
  },
  firstname: String,
  lastname: String,
  birth: {
    type: Date,
    default: Date.now
  },
  password: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;