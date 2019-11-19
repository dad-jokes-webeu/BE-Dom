const db = require('../../data/dbConfig');

function getJokes() {
    return db('jokes').orderBy();
}

module.exports = {
    getJokes,
}