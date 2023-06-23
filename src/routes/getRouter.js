const { Router } = require('express');
const getRouter = Router();
const {
  getDogsHandler,
  getDogsByIdHandler,
  getTemperamentsHandler,
} = require('../handlers/getDogsHandler');
const {
  getLogInHandler,
  getAuthHandler,
} = require('../handlers/getLogInHandler');
const passport = require('passport');
const cookieSession = require('cookie-session');
//require('./passport');

getRouter.get('/', getLogInHandler);
// Auth
getRouter.get(
  '/auth',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Auth Callback
getRouter.get(
  '/auth/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/callback/success',
    failureRedirect: '/auth/callback/failure',
  })
);

// Success
getRouter.get('/auth/callback/success', (req, res) => {
  if (!req.user) res.redirect('/auth/callback/failure');
  res.send('Welcome ' + req.user.email);
});

// failure
getRouter.get('/auth/callback/failure', (req, res) => {
  res.send('Error');
});

//!HANDLERS APP DOGS
getRouter.get('/dogs', getDogsHandler);
getRouter.get('/dogs/:idRaza', getDogsByIdHandler);
getRouter.get('/temperaments', getTemperamentsHandler);

module.exports = getRouter;
