import React from 'react';
import { render } from 'react-dom';

import App from './components/App/App';

function renderApp() {
  render(<App />, document.getElementById('root'));
}

renderApp();

module.hot.accept(renderApp);
