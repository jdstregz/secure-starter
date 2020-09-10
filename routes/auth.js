const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get(
    '/login',
    (req, res, next) => {
        next();
    },
    passport.authenticate('auth0', {
        scope: 'openid email profile',
    }),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        const userReturnObject = {
            nickname: user.nickname,
        };
        req.session.jwt = jwt.sign(userReturnObject, process.env.JWT_SECRET_KEY);
        return res.redirect('/');
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.session = null;
    const homeURL = encodeURIComponent('http://localhost:3000/');
    res.redirect(
        `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${homeURL}&client_id=${process.env.AUTH0_CLIENT_ID}`
    );
});

const jwtRequired = passport.authenticate('jwt', { session: false });

router.get('/private-route', jwtRequired, (req, res) => {
    return res.send('This is a private route');
});

router.get('/current-session', (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.send(false);
        } else {
            res.send(user);
        }
    })(req, res);
});

module.exports = router;
