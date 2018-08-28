import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';

import GridRow from './GridRow';

class GridContent extends Component {
  static defaultProps = {
    data: [{
      infoLink: '', name: 'No Plugins Avialable', source: 'None', version: 'None',
    }],
  };
  
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
      infoLink: string,
      name: string.isRequired,
      source: string.isRequired,
      version: string.isRequired,
    }),
  ),
};

export default GridContent;
