const jwt = require('jsonwebtoken');
const config = require('config');
const session = require('express-session');

module.exports = function (req, res, next) {
  // const token = req.headers['x-auth-token'];
  // const token = req.headers.Authorization;
  // const token = req.header('x-auth-token');
  // if (!token) return res.status(401).send('Access denied. No token provided.');
  const token = req.session.token;
  if (!token) return res.status(401).send(req.body);
  // if (!token) {
  //   // req.flash('error', 'Session Expired.');
  //   res.redirect('/');
  // }
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; 
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}