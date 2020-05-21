const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
  name: String,
  phone: Number,
  email: String,
  subject: String,
  message: String,
});

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
module.exports = ContactUs;
