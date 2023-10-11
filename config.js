require('dotenv').config();

module.exports = {
  jwt: {
    secretKey: process.env.SECRET_KEY,
    signUpSecretKey: process.env.SIGN_UP_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES,
  },
  host: {
    port: process.env.HOST_PORT,
  },
  // cors: {
  //   cors: process.env.CORS,
  // },
};
