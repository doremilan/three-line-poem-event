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
    const { userId } = res.locals.user;
    const { name, adress, phone } = res.body;

    const user = await User.findByPk(userId);

    if (user.isSubmit == true) {
      res.json({
        success: 'true',
        step: 3,
        message: 'Submission completed',
      });
    }

    user.name = name;
    user.adress = adress;
    user.phone = phone;
    user.isSignup = true;
    user.updatedAt = dayjs().toDate();

    User.save();

    const options = {
      expiresIn: config.jwt.expiresIn,
    };
    const signupToken = jwt.sign(userId, config.jwt.signUpSecretKey, options);

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
      console.log('user:', user);
      const options = {
        expiresIn: config.jwt.expiresIn,
      };
      const payload = { userId: user.userId };

      if (user.isSubmit == true) {
        console.log('3');
        return res.json({
          success: 'true',
          step: 3,
          message: 'Submission completed',
        });
      }

      if (user.isSignup == true && user.isSubmit == false) {
        console.log('2');
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
      console.log(token);
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
