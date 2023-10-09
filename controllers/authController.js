const { User } = require('../models');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');
const dayjs = require('dayjs');

const createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      email: 'test@email.com',
      snsName: 'name',
      isLogin: true,
      isSingUp: false,
      isSubmit: false,
    });

    res.status(200).json({
      success: 'true',
      step: 1,
      message: 'Login completed',
    });
  } catch (ex) {
    console.log(ex);
    res.status(401).json({
      success: 'false',
      message: 'Authorization Exception',
    });
  }
};

const signup = async (req, res) => {
  try {
    console.log('5. 회원가입 시작');
    const { userId } = res.locals.user;
    const { name, address, phone } = req.body;

    const user = await User.findByPk(userId);
    console.log('5-1. 회원가입 유저확인:', user.userId);

    const options = {
      expiresIn: config.jwt.expiresIn,
    };
    const payload = { userId: userId };

    if (user.isSubmit == true) {
      console.log('5-2. 회원가입 유저유형: 제출 완료 유저', user.userId);
      res.json({
        success: 'true',
        step: 3,
        message: 'Submission completed',
      });
    }

    if (user.isSignUp == true && user.isSubmit == false) {
      const signupToken = jwt.sign(payload, config.jwt.signUpSecretKey, options);
      console.log('5-3. 회원가입 유저유형: 회원가입 완료 유저', user.userId);
      return res.json({
        success: 'true',
        step: 2,
        message: 'Sign up completed',
        data: {
          signupToken,
        },
      });
    }

    user.name = name;
    user.address = address;
    user.phone = phone;
    user.isSignUp = true;
    user.updatedAt = dayjs().toDate();
    console.log('5-3. 회원가입 유저유형: 신규 회원가입 유저', user);
    await user.save();
    const signupToken = jwt.sign(payload, config.jwt.signUpSecretKey, options);

    res.status(201).json({
      success: 'true',
      step: 2,
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
      step: 1,
      message: 'Login completed',
    });
  } catch (ex) {
    console.log(ex);
    res.status(401).json({
      success: 'false',
      message: 'Authorization Exception',
    });
  }
};

const kakaoCallback = (req, res, next) => {
  passport.authenticate('kakao', { failureRedirect: '/' }, (err, user) => {
    if (err) return next(err);
    try {
      console.log('3. 카카오 콜백 시작');
      const options = {
        expiresIn: config.jwt.expiresIn,
      };
      const payload = { userId: user.userId };

      if (user.isSubmit == true) {
        console.log('3-1. 유저 체크: 제출 완료 유저', user.userId);
        return res.json({
          success: 'true',
          step: 3,
          message: 'Submission completed',
        });
      }

      if (user.isSignUp == true && user.isSubmit == false) {
        console.log('3-2. 유저 체크: 회원가입 완료 유저', user.userId);
        const signupToken = jwt.sign(payload, config.jwt.signUpSecretKey, options);

        return res.json({
          success: 'true',
          step: 2,
          message: 'Sign up completed',
          data: {
            signupToken,
          },
        });
      }

      const token = jwt.sign(payload, config.jwt.secretKey, options);
      console.log('3-3. 유저 체크: 카카오 로그인 완료 유저', user.userId);
      res.json({
        success: 'true',
        step: 1,
        message: 'Login completed',
        data: {
          token,
        },
      });
    } catch (ex) {
      console.log(ex);
    }
  })(req, res, next);
};

module.exports = {
  isLogin,
  signup,
  kakaoCallback,
  createUser,
};
