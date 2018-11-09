import React, { Component } from 'react';

class Entry extends Component {
  deleteEntry(entryID) {
    this.props.deleteEntry(entryID);
  }
    render() {
      const { entryID, contactName, phoneNumber } = this.props.entry
      return (
      <div key={entryID}><b>{contactName}</b>{phoneNumber}<button onClick={() => { this.deleteEntry(entryID) }}>delete</button></div>
      )
    }
  }

  export default Entry;