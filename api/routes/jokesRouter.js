const jokesRouter = require('express').Router();
const Jokes = require('../models/jokesModel')

jokesRouter.get('/', async (req, res) => {
    const jokes = await Jokes.getJokes()
    res.json(jokes);
})

jokesRouter.post('/', async (req, res) => {
    const newJoke = await Jokes.addJoke(req.body);
    res.json(newJoke);
})

module.exports = jokesRouter;