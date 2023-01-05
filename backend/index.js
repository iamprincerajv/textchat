const connectDB = require('./db/config');
const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const Msg = require("./models/Messages");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const verifyUser = require("./middleware/verifyUser");

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

res.json({name: user.name, username: user.username,email: user.email, authToken});

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
        res.json({name: user.name, username: user.username, email: user.email, authToken});

    } catch (error) {
        res.status(400).send("Something error occurred")
    }
})

// SEND MESSAGES
app.post("/sendMsg", verifyUser, [
    body('username', 'Username could not be found').exists(),
    body('messageMe', 'Message cannot be empty').exists(),
    body('friendToChat', 'Receiver could not be found').exists()
], async (req, res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    let msg = await Msg.create({
        username: req.body.username,
        messageMe: req.body.messageMe,
        friendToChat: req.body.friendToChat
    });

    res.json({ username: msg.username, msg: msg.messageMe, friendToChat: msg.friendToChat});
})

// GET MESSAGES
app.get("/getMsg/:username/:friendToChat", verifyUser, async (req, res)=>{
    let result = await Msg.find({
        "username": { "$in" : [req.params.username, req.params.friendToChat]},
        "friendToChat": { "$in" : [req.params.username, req.params.friendToChat]}
    });
    if(result.length > 0) {
        res.send(result);
    } else {
        res.send({error: "No messages were found"});
    }
})

// DELETE MESSAGE
app.delete("/delete/:id", verifyUser, async (req, res)=>{
    let result = await Msg.findOneAndDelete({_id: req.params.id});
    res.json({success: "deleted"})
})

// GET USERS
app.get('/getUsers', verifyUser, async (req, res)=>{
    let result = await User.find();
    res.send(result);
})

// SEARCH USER
app.get("/search/:key", verifyUser, async (req, res)=>{
    let result = await User.find({
        '$or': [
            {username: { $regex: req.params.key.toLowerCase() }},
            {name: { $regex: new RegExp(req.params.key, "i") }}
        ]
    });

    res.send(result);
})

// GET PROFILE
app.get("/getProfile/:key", verifyUser, async (req, res)=>{
    let result = await User.find({
        '$or': [
            {email: req.params.key},
            {username: req.params.key}
        ]
    });

    res.send(result);
})

// UPDATE PROFILE
app.put("/updateProfile/:email/:oldUsername", verifyUser,[
    body('name', 'Enter a valid name').isLength({ min: 3}),
    body('username', 'Enter a valid username').isLength({ min: 3})
], async (req, res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array()});
    }

    let user = await User.findOne({ email: req.params.email});
    if(!user) {
        res.status(404).json({error: "Something went wrong"});
    }

    user = await User.updateOne(
        { email: req.params.email},
        {
            $set: req.body
        }
    );

    if(user) {
        res.json(user);
    }

    let msg1 = await Msg.findOne({username: req.params.oldUsername});
    let msg2 = await Msg.findOne({friendToChat: req.params.oldUsername});

    if(msg1) {
        let msg = await Msg.updateMany(
            {username: req.params.oldUsername},
            {
                $set: {username: req.body.username}
            }
        );
    }
    
    if(msg2) {
        let msg = await Msg.updateMany(
            {friendToChat: req.params.oldUsername},
            {
                $set: {friendToChat: req.body.username}
            }
        );
    }
})

// DELETE USER
app.delete("/deleteUser/:name/:username/:email", verifyUser, async (req, res)=>{
    let result = await User.findOneAndDelete({
        name: req.params.name,
        username: req.params.username,
        email: req.params.email
    });
    res.json({success: "Deleted"});

    if(!result) {
        res.json({error: "Something went wrong"});
    }
})

app.listen(5000);