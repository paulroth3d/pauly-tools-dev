//-- place your javascript down below.

//-- include any base styles
require('../../style/title.scss');
require('../../lib/bootstrap-3.3.7-dist/css/bootstrap.css');


import React from 'react';
import ReactDOM from 'react-dom';

import TitleApp from '../components/title2/TitleApp';

/** convert GET params to an object */
import UrlUtil from '../common/UrlUtil';

//-- simply convert the url params, so the app can handle the rest
const urlParams = UrlUtil.convertQueryToObject();
if (!urlParams.title) {
  urlParams.title = 'Example Title';
}

//-- render the app
ReactDOM.render(
  <TitleApp urlParams={urlParams} />,
  document.getElementById('app')
);
