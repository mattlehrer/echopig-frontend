import { mutate } from 'svelte-apollo';
import { client } from '../../graphql/client';
import { CREATE_USER } from '../../graphql/queries';

export async function post(req, res, next) {
  if (req.body) {
    try {
      const { username, email, password } = req.body;
      const response = await mutate(client, {
        mutation: CREATE_USER,
        variables: {
          createUserInput: {
            username,
            email,
            password,
          },
        },
      });
      console.log(response);
      if (!response.errors) {
        req.session.user = response.data.createUser;
        return res.json(response.data.createUser);
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
