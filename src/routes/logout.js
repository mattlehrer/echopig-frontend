export function get(req, res) {
  delete req.session.user;
  res.redirect('/');
}
