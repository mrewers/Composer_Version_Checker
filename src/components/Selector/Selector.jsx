import React from 'react';

import './selector.css';

const Selector = () => (
  <div className="site-selector">
    <select className="site-drop-down">
      <option value="">Select A Site</option>
    </select>
    <button type="button">Add Another Site</button>
  </div>
);

export default Selector;
