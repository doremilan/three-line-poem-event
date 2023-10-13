const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { v4: uuidv4 } = require('uuid');
const cache = require('memory-cache');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

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
  const { page, size } = req.query;

  try {
    const cachedData = cache.get(`${page}`);

    if (cachedData) {
      console.log('있덩');
      const parsedData = JSON.parse(cachedData);

      return res.status(200).json({
        success: 'true',
        data: {
          total: parsedData.total,
          updatedAt: dayjs().add(9, 'hour').format('YYYY/MM/DD HH:mm:ss'),
          userList: parsedData.userList,
        },
      });
    } else {
      console.log('없덩');
      const totalUsers = await User.findAll();

      if (totalUsers.length == 0) {
        const value = { total: 0, userList: [] };
        cache.put(`${page}`, JSON.stringify(value), 10000);

        return res.status(200).json({
          success: 'true',
          data: {
            total: 0,
            updatedAt: dayjs().add(9, 'hour').format('YYYY/MM/DD HH:mm:ss'),
            userList: [],
          },
        });
      }

      const users = await User.findAll({
        limit: Number(size),
        offset: (Number(page) - 1) * Number(size),
        order: [['createdAt', 'DESC']],
      });

      const results = await users.map((item) => {
        const formattedDate = dayjs(item.createdAt).add(9, 'hour').format('YYYY/MM/DD HH:mm:ss');

        return {
          name: item.name,
          phone: item.phone,
          firstLine: item.firstLine,
          secondLine: item.secondLine,
          thirdLine: item.thirdLine,
          createdAt: formattedDate,
        };
      });

      const value = { total: totalUsers.length, userList: results };
      cache.put(`${page}`, JSON.stringify(value), 10000);

      res.status(200).json({
        success: 'true',
        data: {
          total: value.total,
          updatedAt: dayjs().add(9, 'hour').format('YYYY/MM/DD HH:mm:ss'),
          userList: value.userList,
        },
      });
    }
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
