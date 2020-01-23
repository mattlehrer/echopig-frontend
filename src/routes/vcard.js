import vCard from 'vcards-js';

export function get(req, res, next) {
  console.log('vcard')
  if (req.session && req.session.user && req.session.user.postTag) {
    const postVCard = vCard();

    // set properties
    postVCard.firstName = 'Post To';
    postVCard.lastName = 'Echopig';
    postVCard.organization = 'Echopig';
    postVCard.url = 'https://www.echopig.com';
    postVCard.email = `post+${req.session.user.postTag}@echopig.com`;
    postVCard.photo.attachFromUrl('/android-chrome-256x256.png');

    // set content-type and disposition including desired filename
    res.set('Content-Type', 'text/vcard; name="echopigPost.vcf"');
    res.set('Content-Disposition', 'inline; filename="echopigPost.vcf"');

    // send the response
    res.send(postVCard.getFormattedString());
  } else {
    res.status(401).send({ error: 'No logged in user' });
  }
}