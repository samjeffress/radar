import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Radar from './components/Radar';
import logo from './logo.svg';
import './App.css';

@observer class App extends Component {
  state = { 
    radar: []
  };

  componentDidMount() {
    this.getCurrentRadar();
  }

  getCurrentRadar = () => {
    // Get the passwords and store them in state
    fetch('/api/radar')
      .then(res => res.json())
      .then(radar => this.setState({ radar }));
  }

  updateItem = (itemId, ring, date, reason) => {
    const body = { ring, date, reason };
    fetch(`/api/radar/${itemId}`, {
      method: "PUT",
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify(body)
    })
    .then(res => fetch('/api/radar'))
    .then(res => res.json())
    .then(radar => this.setState({ radar }))
    .catch(e => console.log(e))
  }

  render() {
    const { radar } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>your Radar</code> and save to reload.
        </p>
        
        {radar.length ? <Radar items={radar} updateItem={this.updateItem} /> : <p>probably should add some data</p>}
      </div>
    );
  }
}

export default App;
