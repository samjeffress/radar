import React, { Component } from 'react';
import Radar from './components/Radar';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { radar: [] }

  componentDidMount() {
    this.getCurrentRadar();
  }

  getCurrentRadar = () => {
    // Get the passwords and store them in state
    fetch('/api/radar')
      .then(res => res.json())
      .then(radar => this.setState({ radar }));
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
        
        {radar.length ? <Radar items={radar} /> : <p>probably should add some data</p>}
      </div>
    );
  }
}

export default App;
