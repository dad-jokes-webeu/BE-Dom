const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const jokesRouter = require("./routes/jokesRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/register/', registerRouter);
server.use('/api/login/', loginRouter);
server.use('/api/jokes', jokesRouter);

server.get('/', (req, res) => {
    res.status(200).json("Server running")
})

module.exports = server;