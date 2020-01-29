import { mutate } from 'svelte-apollo';
import { client } from '../../graphql/client';
import { CONFIRM_EMAIL } from '../../graphql/queries';
import { addMsg } from '../../utils/add-msg';

export async function get(req, res, next) {
  if (req.body) {
    try {
      const response = await mutate(client, {
        mutation: CONFIRM_EMAIL, 
        variables: { 
          token: req.params.token,
        },
      });
      console.log(response);
      if (!response.errors) {
        req.session.user = response.data.confirmEmail;
        req.session.messages = addMsg('info', 'Thank you for confirming your email address.', req.session.messages);
        console.log(JSON.stringify(req.session));
        return res.redirect('/');
      } else {
        return res.redirect('/');
      }
    }
    catch (e) {
      return res.json(e);
    }
	} else {
		next();
	}
}