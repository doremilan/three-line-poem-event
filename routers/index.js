const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const poemRouter = require('./poem');

router.use('/auth', authRouter);
router.use('/poem', poemRouter);

module.exports = router;
