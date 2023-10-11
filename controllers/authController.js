const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');

const signup = async (req, res) => {
  try {
    console.log('1. 회원가입 시작');
    const { name, phone } = req.body;

    await User.create({ name: name, phone: phone, isSignUp: true, isSubmit: false });

    const newUser = await User.findOne({
      where: { phone },
    });
    console.log('1-1. 신규 유저 등록 완료: ', newUser.userId);

    const options = {
      expiresIn: config.jwt.expiresIn,
    };
    const payload = { userId: exsistedUser.userId };
    const signupToken = jwt.sign(payload, config.jwt.signUpSecretKey, options);

    res.status(201).json({
      success: 'true',
      message: 'Sign up completed',
      data: {
        signupToken,
      },
    });
  } catch (ex) {
    res.status(400).json({
      success: 'false',
      message: ex.message,
    });
  }
};

const isLogin = async (req, res) => {
  try {
    res.status(200).json({
      success: 'true',
      message: 'signUp completed',
    });
  } catch (ex) {
    console.log(ex);
    res.status(401).json({
      success: 'false',
      message: 'Authorization Exception',
    });
  }
};

module.exports = {
  isLogin,
  signup,
};
