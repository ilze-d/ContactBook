import React, { Component } from 'react';
import './App.css';
import Entry from './components/entry';

class App extends Component {

  state = {
    search: '',
    entries: [],
    entry: {
      contactName: 'test',
      phoneNumber: 0,
    }
  }

  componentDidMount() {
    this.getEntries();
  }

  getEntries = () => {
    console.log('get entries')
    fetch('http://localhost:4000/entries')
    .then(response => response.json())
    .then(response => this.setState({ entries: response.data }))
    .catch(err => console.error(err))
  }

  addEntry = () => {
    const { entry } = this.state;
    fetch(`http://localhost:4000/entries/add?contactName=${entry.contactName}&phoneNumber=${entry.phoneNumber}`)
    .then(this.getEntries)
    .catch(err => console.error(err))
  }

  deleteEntry(id) {
    fetch(`http://localhost:4000/entries/delete?entryID=${id}`)
    .then(this.getEntries)
    .catch(err => console.error(err))
  }

  renderEntry = (entry) => <Entry key={entry.entryID} entry={entry} deleteEntry={this.deleteEntry.bind(this)}/>
  
  updateSearch(event) {
    this.setState({
      search: event.target.value
    })
  }

  render() {
    const { entries, entry } = this.state;

    let filteredEntries = entries.filter(
      (entry) => {
        var name = entry.contactName.toLowerCase()
        return name.indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    );
    return (
      <div className="App">
      <h1>Simple contact app</h1>
      <input className="contact__search" type="text" 
            className="search_input"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            placeholder="Enter name"
          />
        <div className="contact__list">
          {filteredEntries.map(this.renderEntry)}
        </div>
        <div className="contact__add">
          <input placeholder="New Name" onChange={e => this.setState({ entry: {...entry, contactName: e.target.value}})}/>
          <input placeholder="+565 6584934" onChange={e => this.setState({ entry: {...entry, phoneNumber: e.target.value}})}/>
          <button onClick={this.addEntry}>add contact</button>
        </div>
      </div>
    );
  }
}

export default App;
