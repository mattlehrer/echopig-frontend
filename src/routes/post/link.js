import { mutate } from 'svelte-apollo';
import { AuthClient } from '../../graphql/client';
import { CREATE_POST } from '../../graphql/queries';

export async function post(req, res, next) {
  if (req.body && req.session && req.session.token) {
    try {
      const client = AuthClient(req.session.token);
      const response = await mutate(client, {
        mutation: CREATE_POST,
        variables: { createPostInput: req.body },
      });
      console.log(response);
      if (!response.errors) {
        return res.json({ data: response.data.createPost });
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
