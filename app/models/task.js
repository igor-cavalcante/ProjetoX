const mongoose = require("mongoose");

const taskSchema = new mongoose.schema({
  Taskname: {
    type: String,
    require: true,
  },
  check: {
    type: Boolean,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Task", taskSchema);
