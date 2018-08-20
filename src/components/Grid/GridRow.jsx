import React from 'react';
import { shape, string } from 'prop-types';

import { prettify } from '../../utils/textTransform';

const GridRow = ({ data }) => (
  <div className="grid-row">
    <p className="grid-row-item">{ prettify(data.name) || GridRow.defaultProps.data.name }</p>
    <p className="grid-row-item">{ data.version || GridRow.defaultProps.data.version }</p>
    <p className="grid-row-item">{ data.latest }</p>
    <p className="grid-row-item">{ prettify(data.source) || GridRow.defaultProps.data.source }</p>
  </div>
);

GridRow.propTypes = {
  data: shape({
    infoLink: string,
    latest: string,
    name: string.isRequired,
    source: string.isRequired,
    version: string.isRequired,
  }),
};

GridRow.defaultProps = {
  data: {
    infoLink: '', latest: 'Unknown', name: 'No Plugins Avialable', source: 'None', version: 'None',
  },
};

export default GridRow;
