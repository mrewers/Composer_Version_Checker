import React, { Component } from 'react';
import { shape, string } from 'prop-types';

import compareVersions from 'compare-versions';
import checkForDev from '../../utils/checkDev';
import { prettify } from '../../utils/textTransform';

class GridRow extends Component {
  static defaultProps = {
    data: {
      infoLink: '', name: 'No Plugins Avialable', source: 'None', version: 'None',
    },
  }

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
      const fromBranch = checkForDev(data.version);
      if (fromBranch === false) {
        this.compare(data.version, latest);
      }
    }
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

  getWPackagistVersion(url) {
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

  getPackagistVersion(url, source, name) {
    fetch(url)
      .then(response => response.json())
      .then(
        (result) => {
          const response = result.packages[`${source}/${name}`];
          const responseArray = Object.values(response);
          const lastItem = responseArray.length - 1;
          const latestVersion = responseArray[lastItem].version;

          this.setState({
            latest: latestVersion,
          });
        },
      );
  }

  getGitHubVersion(url, source, name) {
    const accessToken = process.env.GIT_PAT;
    const query = `
      query {
        repository(owner:"${source}", name:"${name}") {
          name
          tags:refs(refPrefix:"refs/tags/", last:1) {
            edges {
              tag:node {
                name
              }
            }
          }
        } 
      }
    `;

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then(response => response.json())
      .then(
        (result) => {
          let latestVersion = 'Unknown';

          if (result.errors) {
            console.log(result.errors[0].message); // eslint-disable-line no-console
          } else {
            const data = result.data.repository.tags.edges;
            if (data.length > 0) {
              latestVersion = data[0].tag.name;
            }
          }

          this.setState({
            latest: latestVersion,
          });
        },
        (error) => {
          this.setState({
            latest: 'Unknown',
          });
          console.log(error.message); // eslint-disable-line no-console
        },
      );
  }

  getLatestVersions() {
    const { data } = this.props;

    if (data.source === 'wordpress') {
      this.getWordPressVersion(data.infoLink);
    } else if (data.source === 'wpackagist-plugin') {
      this.getWPackagistVersion(data.infoLink);
    } else if (data.source === 'twig') {
      this.getPackagistVersion(data.infoLink, data.source, data.name);
    } else {
      this.getGitHubVersion(data.infoLink, data.source, data.name);
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
        <p className="grid-row-item">{ prettify(data.name) }</p>
        <p
          className="grid-row-item"
          style={{ backgroundColor: outDated ? '#e59393' : '#ffffff' }}
        >
          { data.version }
        </p>
        <p
          className="grid-row-item"
          style={{ backgroundColor: outDated ? '#e59393' : '#ffffff' }}
        >
          { latest }
        </p>
        <p className="grid-row-item">{ prettify(data.source) }</p>
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

export default GridRow;
