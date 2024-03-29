const db = require("../../data/dbConfig");

function getJokes() {
  return db("jokes");
}

function getPublicJokes() {
  return db('jokes').where({ public: true})
}

function getJokeById(id) {
  return db("jokes")
    .where({ id })
    .first();
}

function addJoke(joke) {
  return db("jokes").insert(joke);
}

function updateJoke(id, joke) {
  return db("jokes")
    .where({ id })
    .update(joke);
}

function deleteJoke(id, joke) {
  return db("jokes")
    .where({ id })
    .del();
}

module.exports = {
  getJokes,
  getPublicJokes,
  getJokeById,
  addJoke,
  updateJoke,
  deleteJoke,
};
