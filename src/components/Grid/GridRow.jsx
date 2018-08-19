import React from 'react';
import { shape, string } from 'prop-types';

const GridRow = ({ data }) => (
  <div className="grid-row">
    <p className="grid-row-item">{data.name || GridRow.defaultProps.data.name }</p>
    <p className="grid-row-item">{data.version || GridRow.defaultProps.data.version}</p>
    <p className="grid-row-item">Latest Version</p>
  </div>
);

GridRow.propTypes = {
  data: shape({
    name: string.isRequired,
    version: string.isRequired,
  }),
};

GridRow.defaultProps = {
  data: { name: 'No Plugins Avialable', version: 'None' },
};

export default GridRow;
