const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config.js');

module.exports = (req, res, next) => {
  try {
    console.log('2. 미들웨어 토큰검증 시작');
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');

    if (!authToken || authType !== 'Bearer') {
      console.log('2-1. 예외처리: 토큰이 없거나 잘못된 경우');
      return res.status(401).send({
        success: 'false',
        message: 'Authorization Exception',
      });
    }

    const payload = jwt.verify(authToken, config.jwt.secretKey);
    console.log('2-2. 토큰 검증, 유저확인:', payload.userId);

    User.findOne({ where: { uuid: payload.userId } }).then((user) => {
      console.log('2-3. 토큰 검증, 유저조회 결과:', user.userId);
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
