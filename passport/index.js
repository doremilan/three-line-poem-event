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
          const user = await User.findOne({
            where: {
              email: profile._json.kakao_account.email,
            },
          });

          if (user) {
            done(null, user);
          } else {
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              //nickname: profile._json.properties.nickname,
              //profileImage: profile._json.properties.profile_image,
              snsName: profile.username,
              isLogin: true,
              isSingUp: false,
              isSubmit: false,
            });

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
