import React, { Component } from 'react';

import GridHeader from '../components/Grid/GridHeader';
import GridContent from '../components/Grid/GridContent';
import Selector from '../components/Selector/Selector';

import parseVendor from '../utils/composerParse';
import populateDropdown from '../utils/siteDropdown';

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

  componentDidUpdate(prevProps, prevState) {
    const { selectedSite } = this.state;
    if (selectedSite !== prevState.selectedSite) {
      this.fetchData(selectedSite);
    }
  }

  // getSiteName() {
  //   const name = document.getElementById('site-drop-down');
  //   if (name) {
  //     const text = name.options[name.selectedIndex].text;
  //     if (text && text !== 'Select A Site') {
  //       console.log(text);
  //     }
  //   }
  //   return;
  // }

  fetchData(selectedSite) {
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
        <h1>WordPress Version Checker</h1>
        <Selector value={selectedSite} callback={this.handleChange} />
        <GridHeader />
        <GridContent data={data} />
      </main>
    );
  }
}

export default GridContainer;
