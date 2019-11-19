const jokesRouter = require('express').Router();
const Jokes = require('../models/jokesModel')

jokesRouter.get('/', async (req, res) => {
    const jokes = await Jokes.getJokes()
    res.json(jokes);
})

module.exports = jokesRouter;