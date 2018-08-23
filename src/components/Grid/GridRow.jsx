import React, { Component } from 'react';
import { shape, string } from 'prop-types';

import compareVersions from 'compare-versions';
import { prettify } from '../../utils/textTransform';

class GridRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latest: 'Unknown',
      outDated: false,
    };
  }

  componentDidMount() {
    this.getLatestVersions();
  }

  componentDidUpdate(prevProps, prevState) {
    const { latest } = this.state;
    const { data } = this.props;

    if (latest && latest !== prevState.latest) {
      this.compare(data.version, latest);
    }
  }

  getPackagistVersion(url) {
    fetch(url)
      .then(response => response.json())
      .then(
        (result) => {
          const latestVersion = result.version;

          this.setState({
            latest: latestVersion,
          });
        },
        (error) => {
          console.log(`Error: ${error.message}`); // eslint-disable-line no-console
        },
      );
  }

  getWordPressVersion(url) {
    fetch(url)
      .then(response => response.json())
      .then(
        (result) => {
          const latestVersion = result.offers[0].current;

          this.setState({
            latest: latestVersion,
          });
        },
        (error) => {
          console.log(`Error: ${error.message}`); // eslint-disable-line no-console
        },
      );
  }

  getLatestVersions() {
    const { data } = this.props;

    if (data.source === 'wordpress') {
      this.getWordPressVersion(data.infoLink);
    } else if (data.source === 'wpackagist-plugin') {
      this.getPackagistVersion(data.infoLink);
    }
  }

  compare(current, latest) {
    if (latest && latest !== 'Unknown') {
      const comparison = compareVersions(current, latest);

      if (comparison === -1) {
        this.setState({
          outDated: true,
        });
      }
    }
  }

  render() {
    const { data } = this.props;
    const { latest, outDated } = this.state;

    return (
      <div className="grid-row">
        <p className="grid-row-item">{ prettify(data.name) || GridRow.defaultProps.data.name }</p>
        <p
          className="grid-row-item"
          style={{ backgroundColor: outDated ? '#e59393' : '#ffffff' }}
        >
          { data.version || GridRow.defaultProps.data.version }
        </p>
        <p
          className="grid-row-item"
          style={{ backgroundColor: outDated ? '#e59393' : '#ffffff' }}
        >
          { latest }
        </p>
        <p className="grid-row-item">{ prettify(data.source) || GridRow.defaultProps.data.source }</p>
      </div>
    );
  }
}

GridRow.propTypes = {
  data: shape({
    infoLink: string,
    name: string.isRequired,
    source: string.isRequired,
    version: string.isRequired,
  }),
};

GridRow.defaultProps = {
  data: {
    infoLink: '', name: 'No Plugins Avialable', source: 'None', version: 'None',
  },
};

export default GridRow;
