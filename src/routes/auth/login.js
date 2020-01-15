export async function post(req, res, next) {
  if (req.body && req.body.__typename === 'User') {
    console.log(`login body: ${JSON.stringify(req.body)}`);
    req.session.user = req.body;
    res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ok: true}));
	} else {
		next();
	}
}