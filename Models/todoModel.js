const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    enum: ["todo", "inprogress", "completed"],
    type: String,
    default: "todo",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;