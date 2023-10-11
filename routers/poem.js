const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const { createPoem } = require('../controllers/poemController');

// 삼행시 등록
router.post('/', authMiddleware, createPoem);

module.exports = router;
