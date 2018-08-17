import React from 'react';

import GridHeader from './GridHeader';
import GridContent from './GridContent';
import Selector from '../Selector/Selector';

import './grid.css';

const Grid = ({ data }) => (
  <main>
    <Selector />
    <GridHeader />
    <GridContent data={data} />
  </main>
);

export default Grid;
