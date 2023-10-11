const dayjs = require('dayjs');
const { User } = require('../models');

const createPoem = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { firstLine, secondLine, thirdLine } = req.body;

    console.log('2. 삼행시 등록 시작:', userId);

    const user = await User.findByPk(userId);

    user.firstLine = firstLine;
    user.secondLine = secondLine;
    user.thirdLine = thirdLine;
    user.isSubmit = true;
    user.updatedAt = dayjs().toDate();
    await user.save();

    console.log('2-1. 삼행시 등록완료:', user.userId);

    res.status(200).json({
      success: 'true',
      message: 'Submission completed',
    });
  } catch (ex) {
    res.status(400).json({
      success: 'false',
      message: ex.message,
    });
  }
};

module.exports = {
  createPoem,
};
