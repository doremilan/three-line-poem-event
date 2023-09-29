const createPoem = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');

    if (!authToken || authType !== 'Bearer') {
      return res.status(401).send({
        success: 'false',
        message: 'Authorization Exception',
      });
    }

    const payload = jwt.verify(authToken, config.jwt.signUpSecretKey);

    const { firstLine, secondLine, thirdLine } = req.body;

    ThreeLinePoem.create({
      userId: payload.userId,
      firstLine,
      secondLine,
      thirdLine,
    });

    res.status(200).json({
      success: 'true',
      step: 3,
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
