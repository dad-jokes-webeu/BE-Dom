const jokesRouter = require('express').Router();
const Jokes = require('../models/jokesModel')
const { restricted } = require('../../middleware/index');

jokesRouter.get('/', async (req, res) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'Invalid credentials, token not valid'});
        } else {
          req.decodedJwt = decodedToken;
          console.log('Decoded Token: ', req.decodedJwt);
          const jokes = Jokes.getJokes()
          res.status(200).json(jokes);
        }
      })
    } else {
        res.json({ message: "User not logged in"})
    }
})

jokesRouter.get('/:id', restricted, async(req, res) => {
    const joke = await Jokes.getJokeById(req.params.id);
    res.json(joke);
})

jokesRouter.post('/', restricted, async (req, res) => {
    const newJoke = await Jokes.addJoke(req.body);
    res.json(newJoke);
})

jokesRouter.put('/:id', restricted, async (req, res) => {
    const updatedJoke = await Jokes.updateJoke(req.params.id, req.body);
    res.json(updatedJoke);
})

jokesRouter.delete('/:id', restricted, async (req, res) => {
    const deletedJoke = await Jokes.deleteJoke(req.params.id, req.body)
    res.json({message: "Joke deleted"})
})

module.exports = jokesRouter;