import { mutate } from 'svelte-apollo';
import { client } from '../../graphql/client';
import { FB_LOGIN } from '../../graphql/queries';

export async function post(req, res, next) {
  if (req.body) {
    try {
      const { id, accessToken } = req.body;
      const response = await mutate(client, {
        mutation: FB_LOGIN,
        variables: {
          fbIdAndToken: {
            id,
            accessToken,
          },
        },
      });
      console.log(response);
      if (!response.errors) {
        req.session.user = response.data.fbLogin.user;
        req.session.token = response.data.fbLogin.token;
        return res.json(response.data.fbLogin.user);
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
