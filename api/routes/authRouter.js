const authRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require('./authModel')
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

authRouter.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 11);

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: hash,
  };

  Users.addUser(newUser)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

authRouter.post("/login", (req, res) => {
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

module.exports = authRouter;
