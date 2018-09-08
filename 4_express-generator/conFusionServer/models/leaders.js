const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const leadersSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: true
    });
var Leaders = mongoose.model('Leader', leadersSchema);
module.exports = Leaders;