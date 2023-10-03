require('dotenv').config();

module.exports = {
  jwt: {
    secretKey: process.env.SECRET_KEY,
    signUpSecretKey: process.env.SIGN_UP_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES,
  },
  kakao: {
    kakaoId: process.env.KAKAO_ID,
    kakaoUrl: process.env.KAKAO_CALLBACK,
  },
  host: {
    port: process.env.HOST_PORT,
  },
  // db: {
  //   dbUserName: process.env.DB_USER_NAME,
  //   dbPassword: process.env.DB_PASSWORD,
  //   dbName: process.env.DB_NAME,
  //   dbHost: process.env.DB_HOST,
  // },
  // cors: {
  //   cors: process.env.CORS,
  // },
};
