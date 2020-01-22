import { mutate } from 'svelte-apollo';
import { AuthClient } from '../../graphql/client';
import { DELETE_POST } from '../../graphql/queries';

export async function post(req, res, next) {
  if (req.body && req.session && req.session.token) {
    try {
      const client = AuthClient(req.session.token);
      const response = await mutate(client, {
        mutation: DELETE_POST,
        variables: { postId: req.body.postId },
      });
      console.log(response);
      if (!response.errors) {
        return res.json({ data: response.data.deletePost });
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
