const request = require('request-promise-native');
const qs = require('querystring');
import dotenv from 'dotenv';
import { post } from '../../../utils/post';
import { addMsg } from '../../../utils/add-msg';

dotenv.config();

export async function get(req, res, next) {
  if (req.query.oauth_token !== req.session.oauth_token) {
    req.session.messages = addMsg(
      'error',
      'Something went wrong loggin in with Twitter. We are looking into the problem. If you continue to have trouble, please reach out to us.',
      req.session.messages,
    );
    return res.redirect('/');
  }
  const oauth = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    token: req.query.oauth_token,
    token_secret: req.session.oauth_token_secret,
    verifier: req.query.oauth_verifier,
  };
  delete req.session.oauth_token_secret;
  delete req.session.oauth_token;

  let url = 'https://api.twitter.com/oauth/access_token';
  let perm_data;
  try {
    const body = await request.post({ url, oauth });
    perm_data = qs.parse(body);
  } catch (e) {
    console.error(e);
    req.session.messages = addMsg(
      'error',
      'Something went wrong logging in with Twitter. If you continue to have trouble, please reach out to us.',
      req.session.messages,
    );
    return res.redirect('/');
  }
  try {
    // check to see if we have existing user
    console.log('posting to /auth/twitter');
    const response = await post(`${process.env.BASE_URL}/auth/twitter`, {
      oauthToken: perm_data.oauth_token,
      oauthTokenSecret: perm_data.oauth_token_secret,
    });

    console.log(response);
    if (response.user) {
      console.log(req.session);
      const { token, user } = response;
      req.session.user = user;
      req.session.token = token;
      req.session.messages = addMsg(
        'info',
        'Successfully logged in with Twitter.',
        req.session.messages,
      );
      return res.redirect('/');
    } else {
      req.session.messages = addMsg(
        'info',
        'Successfully logged in with Twitter. Please pick a username to complete registration.',
        req.session.messages,
      );
      req.session.registration = {
        oauthToken: perm_data.oauth_token,
        oauthTokenSecret: perm_data.oauth_token_secret,
      };
      return res.redirect('/register');
    }

  } catch (e) {
    console.error(e);
    req.session.messages = addMsg(
      'info',
      'Successfully logged in with Twitter. Please pick a username to complete registration.',
      req.session.messages,
    );
    req.session.registration = {
      oauthToken: perm_data.oauth_token,
      oauthTokenSecret: perm_data.oauth_token_secret,
    };
    return res.redirect('/register');
  }
}
