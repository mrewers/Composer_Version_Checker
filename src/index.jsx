import React from 'react';
import { render } from 'react-dom';

import App from './components/App/App';

import './style/main.scss';

function renderApp() {
  render(<App />, document.getElementById('version-checker-root'));
}

renderApp();

module.hot.accept(renderApp);
