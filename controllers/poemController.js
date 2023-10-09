const { User } = require('../models');
const { ThreeLinePoem } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');

const createPoem = async (req, res) => {
  try {
    console.log('6. 삼행시 제출 토큰검증 시작');
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');

    if (!authToken || authType !== 'Bearer') {
      console.log('6-1. 토큰이 없거나 잘못된 경우');
      return res.status(401).send({
        success: 'false',
        message: 'Authorization Exception',
      });
    }

    const payload = jwt.verify(authToken, config.jwt.signUpSecretKey);
    console.log('6-2. 토큰 검증:', payload.userId);

    const user = await User.findByPk(payload.userId);
    console.log('6-3. 유저 조회:', user);

    if (user.isSubmit == true) {
      console.log('6-4. 유저 유형: 이미 제출 완료한 유저', user.userId);
      return res.json({
        success: 'true',
        step: 4,
        message: 'already Submission completed',
      });
    }

    const { firstLine, secondLine, thirdLine } = req.body;

    await ThreeLinePoem.create({
      userId: payload.userId,
      firstLine,
      secondLine,
      thirdLine,
    });

    user.isSubmit = true;
    await user.save();

    res.status(200).json({
      success: 'true',
      step: 3,
      message: 'Submission completed',
    });
  } catch (ex) {
    res.status(400).json({
      success: 'false',
      message: ex.message,
    });
  }
};

module.exports = {
  createPoem,
};
