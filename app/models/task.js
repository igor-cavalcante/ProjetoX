const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  notifications: {
    type: Boolean,
  },
  notes: {
    type: String,
  },
  check: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notified: { // Nova propriedade para rastrear notificações
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Task", taskSchema);
