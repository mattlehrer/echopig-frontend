import { mutate } from 'svelte-apollo';
import { client } from '../../graphql/client';
import { CREATE_SOCIAL_USER } from '../../graphql/queries';

export async function post(req, res, next) {
  if (req.body) {
    try {
      const { username, facebook, tokens } = req.body;
      const response = await mutate(client, {
        mutation: CREATE_SOCIAL_USER,
        variables: {
          createSocialUserInput: {
            username,
            facebook,
            tokens,
          },
        },
      });
      console.log(response);
      if (!response.errors) {
        req.session.user = response.data.createSocialUser.user;
        req.session.token = response.data.createSocialUser.token;
        return res.json(response.data.createSocialUser.user);
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
