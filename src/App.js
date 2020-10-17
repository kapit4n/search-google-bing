import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import { searchAction, searchTextAction, searchEngineAction } from './actions';
import Detail from './components';

class App extends Component {

  handleChange = e => {
    const { dispatch } = this.props;
    dispatch(searchTextAction(e.target.value));
  }

  handleSearchEngineChange = e => {
    const { dispatch } = this.props;
    dispatch(searchEngineAction(e.target.value));
  }

  onSubmit = () => {
    const { dispatch } = this.props;
    if (this.props.searchText) {
      dispatch(searchAction(this.props.searchText));
    }
  }

  render() {
    return (
      <div className="App" style={{ width: '80%', margin: '10%' }}>
        <div style={{ display: 'flex' }}>

          <input value={this.props.searchText} onChange={this.handleChange} />
          <select value={this.props.searchEngine} onChange={this.handleSearchEngineChange}>
            <option value="google">Google</option>
            <option value="bing">Bing</option>
            <option value="both">Both</option>
          </select>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
        <div>
          <h2>Search result</h2>
          {this.props.items.map(it => (
            <Detail key={it.id} searchItem={it} />
          ))}
        </div>
      </div >
    );
  }
}


const mapStateToProps = state => {
  const { searchText, search, searchEngine } = state;
  return {
    searchText,
    items: search.items,
    searchEngine: searchEngine,
  }

}

export default connect(mapStateToProps)(App);
