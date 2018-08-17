import React from 'react';
import { object } from 'prop-types';

import GridRow from './GridRow';

const GridContent = ({ data }) => (
  <ul className="grid-body">
    <GridRow data={data} />
  </ul>
);

GridContent.propTypes = {
  data: object
};

export default GridContent;
