const loginRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require('../models/authModel')
const jwt = require('jsonwebtoken');
const secrets = require ('../../config/secrets');

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        email: user.email,
    }

    const options = {
        expiresIn: '1d',
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}


loginRouter.post("/", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);

                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                });
            } else {
                res.status(401).json({ message: "Invalid Credentials" })
            }
        })
        .catch(error => {
            res.status(500).json(error) 
        })
});

module.exports = loginRouter;
