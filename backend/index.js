const connectDB = require('./db/config');
const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const codeForJWT = 'hightideison4378';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// SIGN UP
app.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 3}),
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Password must be atleast 6 characters long').isLength({ min: 6})
], async (req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

let user = await User.findOne({ email: req.body.email});
if(user) {
    return res.json({error: "User Already Exists"})
}

const salt = await bcrypt.genSalt(10);
const securePass = await bcrypt.hash(req.body.password, salt);

// Creating user
user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: securePass
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