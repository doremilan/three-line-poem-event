const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config.js');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');

    if (!authToken || authType !== 'Bearer') {
      return res.status(401).send({
        success: 'false',
        message: 'Authorization Exception',
      });
    }

    const payload = jwt.verify(authToken, config.jwt.secretKey);

    User.findByPk(payload.userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (ex) {
    console.log('Auth Middleware', ex);

    return res.status(401).send({
      success: 'false',
      message: ex.message,
    });
  }
};
