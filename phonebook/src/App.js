import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    entries: [],
    entry: {
      contactName: 'test',
      phoneNumber: 0,
    }
  }

  componentDidMount() {
    this.getEntries();
  }

  getEntries = _ => {
    fetch('http://localhost:4000/entries')
    .then(response => response.json())
    .then(response => this.setState({ entries: response.data }))
    .catch(err => console.error(err))
  }

  addEntry = _ => {
    const { entry } = this.state;
    fetch(`http://localhost:4000/entries/add?contactName=${entry.contactName}&phoneNumber=${entry.phoneNumber}`)
    .then(this.getEntries)
    .catch(err => console.error(err))
  }

  renderEntry = ({entryID, contactName, phoneNumber }) => <div key={entryID}><b>{contactName}</b>{phoneNumber}</div>

  render() {
    const { entries, entry } = this.state;
    return (
      <div className="App">
        {entries.map(this.renderEntry)}
        <div>
          <input value={entry.contactName} onChange={e => this.setState({ entry: {...entry, contactName: e.target.value}})}/>
          <input value={entry.phoneNumber} onChange={e => this.setState({ entry: {...entry, phoneNumber: e.target.value}})}/>
          <button onClick={this.addEntry}>add contact</button>
        </div>
      </div>
    );
  }
}

export default App;
