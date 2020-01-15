import express from 'express';
import bodyParser from 'body-parser';
import * as sapper from '@sapper/server';
// import uuidv4 from 'uuid/v4';
import helmet from 'helmet';
import session from 'express-session';
import mongoose from 'mongoose';
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

const { PORT, NODE_ENV, COOKIE_SECRET, DOMAIN, DB_URI, DB_NAME } = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, {
  dbName: DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', err => {
  if (err) {
    console.error(
      `Database could not be opened: ${JSON.stringify(
        err,
        Object.getOwnPropertyNames(err),
      )}`,
    );
    return;
  }
});

db.on('error', err => {
  console.error(
    `Database error: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`,
  );
});

const app = express();

// app.use((req, res, next) => {
//   res.locals.nonce = uuidv4();
//   next();
// });
app.use(helmet({
  frameguard: true,
  noSniff: true,
  featurePolicy: {
    features: {
      geolocation: ["'none'"],
      midi: ["'none'"],
      notifications: ["'none'"],
      push: ["'none'"],
      syncXhr: ["'none'"],
      microphone: ["'none'"],
      camera: ["'none'"],
      magnetometer: ["'none'"],
      gyroscope: ["'none'"],
      speaker: ["'self'"],
      vibrate: ["'none'"],
      fullscreen: ["'none'"],
      payment: ["'none'"],
    },
  },
  contentSecurityPolicy: {
    directives: {
      // defaultSrc: ["'self'", 'use.fontawesome.com', 'cdn.jsdelivr.net'],
      // styleSrc: ["'self'", 'cdn.jsdelivr.net', 'use.fontawesome.com'],
      // scriptSrc: [
      //   "'self'",
      //   "use.fontawesome.com",
      //   (req, res) => `'nonce-${res.locals.nonce}'`
      // ],
      mediaSrc: ['*'],
      // fontSrc: ["'self'"],
    },
  },
  referrerPolicy: { policy: 'no-referrer-when-downgrade' },
}));
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions',
  }),
  cookie: {
    // httpOnly: true,
    // secure: true,
    // signed: true,
    // domain: DOMAIN,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
  secret: COOKIE_SECRET,
  name: 'epCookie',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.static('static'));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   console.log(req.user);
//   console.log(req.session.user);
//   if (typeof req.session.user === 'undefined') {
//     req.session.user = {};
//   }
//   next();
// });
app.use(sapper.middleware({
  session: req => ({
    user: req.session && req.session.user
  })
}));
app.listen(PORT, err => {
  if (err) console.log('error', err);
});
