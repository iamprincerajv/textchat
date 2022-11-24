const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const messages = new Schema({
    username:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Msg = mongoose.model("messages", messages);

module.exports = Msg;