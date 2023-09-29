const express = require('express');
const router = express.Router();

const { createPoem } = require('../controllers/poemController');

// 삼행시 등록
router.post('/', createPoem);

module.exports = router;
