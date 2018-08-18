import React, { Component } from 'react';

import Grid from '../components/Grid/Grid';
import { site } from '../utils/composerParse';

class GridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: null,
    };
  }

  componentDidMount() {
    fetch(site)
      .then(response => response.json())
      .then(
        (result) => {
          const dependencies = [];
          Object.entries(result.require).forEach(([key, value]) => dependencies.push({ name: key, version: value }));
          this.setState({
            data: dependencies,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        },
      );
  }

  render() {
    const { data, error } = this.state;

    if (error) {
      return (
        <div>
          Error:
          {error.message}
        </div>
      );
    }

    return (<Grid data={data} />);
  }
}

export default GridContainer;
