import React from 'react';
import { string, func } from 'prop-types';

import { toggleAdmin } from '../../utils/adminToggle';

const Selector = ({ value, callback }) => (
  <div className="site-selector">
    <select id="site-drop-down" value={value} className="site-drop-down" onChange={callback} />
    <button id="admin-toggle" type="button" onClick={toggleAdmin}>Add Another Site</button>
  </div>
);

Selector.propTypes = {
  value: string,
  callback: func,
};

Selector.defaultProps = {
  value: '',
  callback: { handleChange: () => {} },
};

export default Selector;
