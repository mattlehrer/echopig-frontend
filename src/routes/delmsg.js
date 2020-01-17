export function post(req, res) {
  try {
    const { msg } = req.body;
    if (req.session && req.session.messages && req.session.messages.length)
      req.session.messages = req.session.messages.filter(
        m => m.message !== msg,
      );
  } catch (e) {
    console.log(e);
  }
  res.json(null);
}
