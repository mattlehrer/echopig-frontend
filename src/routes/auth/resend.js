import { mutate } from 'svelte-apollo';
import { AuthClient } from '../../graphql/client';
import { RESEND_CONFIRM_EMAIL } from '../../graphql/queries';

export async function post(req, res, next) {
  if (req.body && req.session && req.session.token) {
    try {
      console.log(req.body);
      const client = AuthClient(req.session.token);
      const variables = {
        email: req.body.email,
      };
      const response = await mutate(client, {
        mutation: RESEND_CONFIRM_EMAIL, 
        variables,
      });
      console.log(response);
      if (!response.errors) {
        req.session.user = response.data.resendConfirmEmail;
        return res.json(response.data.resendConfirmEmail);
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