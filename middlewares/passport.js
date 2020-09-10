const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const JwtStrategy = require('passport-jwt').Strategy;
const auth0Strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL,
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
        return done(null, profile);
    }
);

const jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: (req) => req.session.jwt,
        secretOrKey: process.env.JWT_SECRET_KEY,
    },
    (payload, done) => {
        // TODO: add additional jwt token verification
        return done(null, payload);
    }
);

passport.use(auth0Strategy);
passport.use(jwtStrategy);

module.exports = passport;
