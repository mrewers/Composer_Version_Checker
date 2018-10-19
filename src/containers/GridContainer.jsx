import React, { Component } from 'react';

import GridHeader from '../components/Grid/GridHeader';
import GridList from '../components/Grid/GridList';
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
      siteTitle: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    populateDropdown();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedSite } = this.state;
    if (selectedSite && selectedSite !== prevState.selectedSite) {
      this.fetchData(selectedSite);
      this.getSiteName();
    }
  }

  getSiteName() {
    const name = document.getElementById('site-drop-down');
    const title = ` - ${name.options[name.selectedIndex].text}`;

    if (title && title !== 'Select A Site') {
      this.setState({
        siteTitle: title,
      });
    }
  }

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
    const {
      data, error, selectedSite, siteTitle,
    } = this.state;

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
        <h1>
          WordPress Version Checker
          {siteTitle}
        </h1>
        <Selector value={selectedSite} callback={this.handleChange} />
        <GridHeader />
        <ul className="grid-body">
          <GridList data={data} />
        </ul>
      </main>
    );
  }
}

export default GridContainer;
