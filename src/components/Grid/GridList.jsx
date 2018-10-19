import React from 'react';

import GridItem from './GridItem';

const GridList = ({ data }) => (
  data.map(item => <li key={item.name}><GridItem data={item} /></li>)
);

export default GridList;
