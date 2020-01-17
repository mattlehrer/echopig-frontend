import { mutate } from 'svelte-apollo';
import { AuthClient } from '../../graphql/client';
import { UPDATE_USER } from '../../graphql/queries';

export async function post(req, res, next) {
  if (req.body && req.session && req.session.token) {
    try {
      let shouldRelogin = !!req.body.username || !!req.body.password;
      const client = AuthClient(req.session.token);
      const response = await mutate(client, {
        mutation: UPDATE_USER,
        variables: { updateUserInput: req.body },
      });
      console.log(response);
      if (!response.errors) {
        req.session.user = response.data.updateUser;
        if (shouldRelogin) delete req.session.token;
        return res.json({ user: response.data.updateUser });
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
