const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

mongoose.model("Todo", TodoSchema);
