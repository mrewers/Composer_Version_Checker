import React, { Component } from 'react';

import Grid from '../components/Grid/Grid';
import GridHeader from '../components/Grid/GridHeader';
import GridContent from '../components/Grid/GridContent';
import Selector from '../components/Selector/Selector';

import { parseVendor } from '../utils/composerParse';
import { populateDropdown } from '../utils/siteDropdown';

class GridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: null,
      selectedSite: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    populateDropdown();
  }

  componentDidUpdate() {
    const { selectedSite } = this.state;
    if (selectedSite) {
      fetch(selectedSite)
        .then(response => response.json())
        .then(
          (result) => {
            const dependencies = [];
            const dependenciesClean = [];
            Object.entries(result.require).forEach(([key, value]) => dependencies.push({ name: key, version: value }));
            parseVendor(dependencies, dependenciesClean);

            this.setState({
              data: dependenciesClean,
            });
          },
          (error) => {
            this.setState({
              error,
            });
          },
        );
    }
  }

  handleChange(event) {
    this.setState({ selectedSite: event.target.value });
  }

  render() {
    const { data, error, selectedSite } = this.state;

    if (error) {
      return (
        <div>
          Error:
          {error.message}
        </div>
      );
    }

    return (
      <main>
        <Selector value={selectedSite} callback={this.handleChange} />
        <GridHeader />
        <GridContent data={data || Grid.defaultProps.data} />
      </main>
    );
  }
}

export default GridContainer;
