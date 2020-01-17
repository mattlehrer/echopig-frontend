import { mutate } from 'svelte-apollo';
import { client } from '../../graphql/client';
import { LOGIN } from '../../graphql/queries';

export async function post(req, res, next) {
  if (req.body) {
    try {
      const response = await mutate(client, {
        mutation: LOGIN, 
        variables: { 
          loginUser: 
            {
              username: req.body.username,
              password: req.body.password
            }
          },
      });
      console.log(response);
      if (!response.errors) {
        req.session.user = response.data.login.user;
        req.session.token = response.data.login.token;
        return res.json(response.data.login.user);
      } else {
        return res.json(response);
      }
    }
    catch (e) {
      return res.json(e);
    }
	} else {
		next();
	}
}