const connectDB = require('./db/config');
const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const Msg = require("./models/Messages");
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
    body('username', 'Enter a valid username').isLength({ min: 3}),
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
user = await User.findOne({ username: req.body.username});
if(user) {
    return res.json({error: "User Already Exists"})
}

const salt = await bcrypt.genSalt(10);
const securePass = await bcrypt.hash(req.body.password, salt);

// Creating user
user = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: securePass
});

let data = {
    user:{
        id: user.id
    }
};

const authToken = jwt.sign(data, codeForJWT);

res.json({name: user.name, username: user.username, authToken});

})

// LOG IN
app.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) =>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error: 'Please login with correct email or password'})
        }

        const passCompare = await bcrypt.compare(password, user.password);
        
        if(!passCompare) {
            return res.status(400).json({error: 'Please enter correct password'})
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, codeForJWT);
        res.json({name: user.name, username: user.username, authToken});

    } catch (error) {
        res.status(400).send("Something error occurred")
    }
})

// SEND MESSAGES
app.post("/sendMsg", [
    body('username', 'Username could not be found').exists(),
    body('message', 'Message cannot be empty').exists()
], async (req, res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    let msg = await Msg.create({
        username: req.body.username,
        message: req.body.message
    });

    res.json({ username: msg.username, msg: msg.message});
})

// GET MESSAGES
app.get("/getMsg/:username", async (req, res)=>{
    let result = await Msg.find({
        '$or': [
            {username: req.params.username}
        ]
    });
    if(result.length > 0) {
        res.send(result);
    } else {
        res.send({error: "No messages were found"});
    }
})

// DELETE MESSAGE
app.delete("/delete/:id", async (req, res)=>{
    let result = await Msg.findOneAndDelete({_id: req.params.id});
    res.json({success: "deleted"})
})

// GET USERS
app.get('/getUsers', async (req, res)=>{
    let result = await User.find();
    res.send(result);
})

app.listen(5000);