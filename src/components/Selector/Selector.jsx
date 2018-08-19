import React from 'react';

import { toggleAdmin } from '../../utils/adminToggle';

const Selector = () => (
  <div className="site-selector">
    <select className="site-drop-down">
      <option value="">Select A Site</option>
    </select>
    <button id="admin-toggle" type="button" onClick={toggleAdmin}>Add Another Site</button>
  </div>
);

export default Selector;
