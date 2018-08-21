import React from 'react';
import { string, func } from 'prop-types';

import { toggleAdmin } from '../../utils/adminToggle';

const Selector = ({ value, callback, getVersion }) => (
  <div className="site-selector">
    <select id="site-drop-down" value={value} className="site-drop-down" onChange={callback} />
    <h1>WordPress Version Checker</h1>
    <div>
      <button id="admin-toggle" type="button" onClick={toggleAdmin}>Add Another Site</button>
      <button id="version-toggle" type="button" onClick={getVersion}>Update Versions</button>
    </div>
  </div>
);

Selector.propTypes = {
  value: string,
  callback: func,
  getVersion: func,
};

Selector.defaultProps = {
  value: '',
  callback: { handleChange: () => {} },
  getVersion: { getLatestVersions: () => {} },
};

export default Selector;
