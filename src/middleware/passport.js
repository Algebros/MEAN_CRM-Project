const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const { SECRET_KEY } = require('../config');

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
}

module.exports = (passport) => {
  passport.use(
    new jwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id');
        if(user) done(null, user);
        else done(null, false);
      } catch (error) {
        console.log(error);
      }
    })
  )
}