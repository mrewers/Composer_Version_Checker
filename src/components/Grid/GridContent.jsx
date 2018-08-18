import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';

import GridRow from './GridRow';

class GridContent extends Component {
  render() {
    const { data } = this.props;

    return (
      <ul className="grid-body">
        {data.map(function (item) {
          return <li key={item.name}><GridRow data={item} /></li>;
        })}
      </ul>
    );
  }
}

GridContent.propTypes = {
  data: arrayOf(
    shape({
      name: string.isRequired,
      version: string.isRequired,
    }),
  ),
};

GridContent.defaultProps = {
  data: [{ name: 'No Plugins Avialable', version: 'None' }],
};

export default GridContent;
