const { User } = require('../models');
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const config = require('../config');

module.exports = (app) => {
  app.use(passport.initialize());
  passport.use(
    new KakaoStrategy(
      {
        clientID: config.kakao.kakaoId,
        callbackURL: config.kakao.kakaoUrl,
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('1. 카카오 로그인 시작');
          const user = await User.findOne({
            where: {
              email: profile._json.kakao_account.email,
            },
          });
          console.log('2. 유저 체크:', user);
          if (user) {
            console.log('2-1. 유저 유형: 기존 유저');
            done(null, user);
          } else {
            await User.create({
              email: profile._json.kakao_account.email,
              //nickname: profile._json.properties.nickname,
              //profileImage: profile._json.properties.profile_image,
              snsName: profile.username,
              isLogin: true,
              isSingUp: false,
              isSubmit: false,
            });

            const newUser = await User.findOne({
              where: {
                email: profile._json.kakao_account.email,
              },
            });
            console.log('2-2. 유저 유형: 신규 유저', newUser);

            done(null, newUser);
          }
        } catch (ex) {
          console.error(ex);
          done(ex);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
