//-- place your javascript down below.

require('../../style/title2.scss');
require('../../lib/bootstrap-3.3.7-dist/css/bootstrap.css');

import React from 'react';
import ReactDOM from 'react-dom';

import TitleApp from '../components/title2/TitleApp';

const expressParams = {
  href: window.location.href,
  defaultTitle: 'Example Title'
};

ReactDOM.render(
  <TitleApp expressParams={expressParams} />,
  document.getElementById('app')
);
