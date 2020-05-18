const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notes:String,
  dueDate:String,
  completed:Boolean,
  completedOn:String,
  user:{
      type:Schema.Types.ObjectId,
      ref:"User"
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
