const mongoose = require("mongoose");

const ImcSchema = new mongoose.Schema({
    IMC: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: function() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return today;
        },
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
});

module.exports =  mongoose.model("Imc", ImcSchema);