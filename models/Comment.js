const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
 
const commentSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  photoComment: String
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;