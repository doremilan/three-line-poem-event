const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware');

const { signup, kakaoCallback, isLogin, createUser } = require('../controllers/authController');

// 카카오 로그인
router.get('/kakao', kakaoCallback);
router.get('/kakao/callback', passport.authenticate('kakao'));

// 로그인 체크
router.get('/me', authMiddleware, isLogin);

// 회원가입
router.post('/signup', authMiddleware, signup);

// 테스트
router.post('/', createUser);

module.exports = router;
