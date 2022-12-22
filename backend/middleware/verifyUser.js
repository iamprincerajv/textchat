const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const codeForJWT = 'hightideison4378';

const verifyUser = (req, res, next)=> {
    let token = req.headers["authorization"];

    if(token) {
        token = token.split(" ")[1];
        jwt.verify(token, codeForJWT, (err, valid)=> {
            if(err) {
                res.status(401).send({ result: "Please provide a valid token" });
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ result: "Login to your account first" });
    }
}

module.exports = verifyUser;