const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const messages = new Schema({
    username:{
        type: String,
        required: true
    },
    messageMe: {
        type: String,
        required: true
    },
    friendToChat:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Msg = mongoose.model("messages", messages);

module.exports = Msg;