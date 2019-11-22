const registerRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require('../models/authModel');

registerRouter.post("/", (req, res) => {
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

module.exports = registerRouter;