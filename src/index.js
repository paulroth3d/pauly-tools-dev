const express = require('express');
const path = require('path');
const config = require('config');

const PORT = process.env.PORT || config.DEFAULT.PORT;

/**
 * base page redirect
 */
function handleBaseRedirect(req, resp) {
  const redirectURL = (process.env.BASE_REDIRECT || config.BASE_REDIRECT);
  resp.redirect(redirectURL);
}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', handleBaseRedirect) //(req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
