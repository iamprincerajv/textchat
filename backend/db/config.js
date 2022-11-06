const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/hellochat', () => {
        console.log('database connected successfully');
    })
}

module.exports = connectDB;