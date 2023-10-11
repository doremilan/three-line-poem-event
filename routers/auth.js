const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const { signup, isLogin, getUsers } = require('../controllers/authController');

// 로그인 체크
router.get('/me', authMiddleware, isLogin);

// 회원가입
router.post('/signup', signup);

// 유저 조회
router.get('/', getUsers);

module.exports = router;
