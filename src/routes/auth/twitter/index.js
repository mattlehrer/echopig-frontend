const request = require('request-promise-native');
const qs = require('querystring');
import dotenv from 'dotenv';
import { mutate } from 'svelte-apollo';
import { client } from '../../../graphql/client';
import { TWITTER_LOGIN } from '../../../graphql/queries';
import { addMsg } from '../../../utils/add-msg';
dotenv.config();

export async function get(req, res, next) {
  const oauth = {
    callback: process.env.BASE_URL+'/auth/twitter/callback',
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  };
  const url = 'https://api.twitter.com/oauth/request_token';

  try {
    const body = await request.post({ url, oauth });
    const req_data = qs.parse(body);
    req.session.oauth_token_secret = req_data.oauth_token_secret;
    req.session.oauth_token = req_data.oauth_token;

    const query = qs.stringify({ oauth_token: req_data.oauth_token });
    const uri = `https://api.twitter.com/oauth/authenticate?${query}`;

    // redirect the user to the authorize uri
    return res.redirect(uri);
  }
  catch (e) {
    console.error(e);
    req.session.messages = addMsg(
      'error',
      'Something went wrong loggin in with Twitter. We are looking into the problem. If you continue to have trouble, please reach out to us.',
      req.session.messages,
    );
    return res.redirect('/');
  }
}

export async function post(req, res, next) {
  if (req.body) {
    try {
      const { oauthToken, oauthTokenSecret } = req.body;
      const response = await mutate(client, {
        mutation: TWITTER_LOGIN,
        variables: {
          twitterTokens: {
            oauthToken,
            oauthTokenSecret,
          },
        },
      });
      console.log(response);
      if (!response.errors) {
        return res.json(response.data.twitterLogin);
      } else {
        return res.json(response);
      }
    } catch (e) {
      return res.json(e);
    }
  } else {
    next();
  }
}
