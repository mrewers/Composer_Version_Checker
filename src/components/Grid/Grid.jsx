import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

import GridHeader from './GridHeader';
import GridContent from './GridContent';
import Selector from '../Selector/Selector';

const Grid = ({ data }) => (
  <main>
    <Selector />
    <GridHeader />
    <GridContent data={data || Grid.defaultProps.data} />
  </main>
);

Grid.propTypes = {
  data: arrayOf(
    shape({
      name: string.isRequired,
      version: string.isRequired,
    }),
  ),
};

Grid.defaultProps = {
  data: [{ name: 'No Plugins Avialable', version: 'None' }],
};

export default Grid;
