const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

function restricted(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'Invalid credentials, token not valid'});
        } else {
          req.decodedJwt = decodedToken;
          console.log('Decoded Token: ', req.decodedJwt);
          next();
        }
      })
    }
  }

module.exports = {
    restricted,
}