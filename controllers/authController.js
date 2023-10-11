const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');

const signup = async (req, res) => {
  try {
    console.log('1. 회원가입 시작');
    const { name, phone } = req.body;
    const uuid = uuidv4();

    const newUser = await User.create({ uuid: uuid, name: name, phone: phone, isSignUp: true, isSubmit: false });
    console.log('1-1. 신규 유저 등록 완료: ', newUser.uuid);

    const options = {
      expiresIn: config.jwt.expiresIn,
    };
    const payload = { userId: newUser.uuid };
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

const getUsers = async (req, res) => {
  try {
    const { page, size } = req.query;

    const totalUsers = await User.findAll();

    if (totalUsers.length == 0) {
      return res.status(200).json({
        success: 'true',
        data: {
          total: 0,
          updatedAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
          userList: [],
        },
      });
    }

    const users = await User.findAll({
      limit: Number(size),
      offset: (Number(page) - 1) * Number(size),
    });

    const results = await users.map((item) => {
      const formattedDate = dayjs(item.createdAt).format('YYYY/MM/DD HH:mm:ss');

      return {
        name: item.name,
        phone: item.phone,
        firstLine: item.firstLine,
        secondLine: item.secondLine,
        thirdLine: item.thirdLine,
        createdAt: formattedDate,
      };
    });

    res.status(200).json({
      success: 'true',
      data: {
        total: totalUsers.length,
        updatedAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
        userList: results,
      },
    });
  } catch (ex) {
    res.status(400).json({
      success: 'false',
      message: ex.message,
    });
  }
};

module.exports = {
  isLogin,
  signup,
  getUsers,
};
