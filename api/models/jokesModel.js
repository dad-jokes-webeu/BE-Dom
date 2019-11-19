const db = require('../../data/dbConfig');

function getJokes() {
    return db('jokes')
}

function getJokeById(id) {
    return db('jokes').where({ id }).first();
}

function addJoke(joke) {
    return db('jokes').insert(joke);
}

module.exports = {
    getJokes,
    getJokeById,
    addJoke,
}