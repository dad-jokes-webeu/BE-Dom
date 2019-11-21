const db = require("../../data/dbConfig");

function getJokes() {
  return db("jokes");
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
  const deletedJoke = getJokeById(id);
  db("jokes")
    .where({ id })
    .del();
  return deletedJoke;
}

module.exports = {
  getJokes,
  getJokeById,
  addJoke,
  updateJoke,
  deleteJoke,
};