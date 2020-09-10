// server.js
const express = require('express');
const session = require('cookie-session');
const helmet = require('helmet');
const hpp = require('hpp');
const csurf = require('csurf');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');


/* Import config */
dotenv.config({path: path.resolve(__dirname, '.env')});

const passport = require('./middlewares/passport');

/* Create Express App */
const app = express();

/* Set Security Configs */
app.use(helmet());
app.use(hpp());

/* Set Cookie Settings */
app.use(
    session({
        name: 'session',
        secret: process.env.COOKIE_SECRET,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })
);
app.use(csurf());

/* Rate Limiter */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

app.use(passport.initialize());

const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

app.listen(8080, () => {
    console.log("I'm listening!");
});

module.exports = app;