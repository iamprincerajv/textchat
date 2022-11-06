const connectDB = require('./db/config');
const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

const codeForJWT = 'hightideison4378';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// SIGN UP
app.post('/signup', async (req, res)=>{
let user = await User.findOne({ email: req.body.email});
if(user) {
    return res.json({error: "User Already Exists"})
}

// Creating user
user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
});

let data = {
    user:{
        id: user.id
    }
};

const authToken = jwt.sign(data, codeForJWT);

res.json({authToken});

})

app.listen(5000);