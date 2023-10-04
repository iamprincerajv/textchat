const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb+srv://cccccccccc:cccccc@cluster0.vikr26b.mongodb.net/helloChat', () => {
        console.log('database connected successfully');
    })
}

module.exports = connectDB;
