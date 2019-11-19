const jokesRouter = require('express').Router();
const Jokes = require('../models/jokesModel')
const { restricted } = require('../../middleware/index');

jokesRouter.get('/', restricted, async (req, res) => {
    const jokes = await Jokes.getJokes();
    res.json(jokes);
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
    res.json({message: "Deleted the following joke:", joke: deletedJoke })
})

module.exports = jokesRouter;