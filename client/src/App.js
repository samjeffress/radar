import React, { Component } from 'react';
import MobxFirebaseStore from 'mobx-firebase-store';
import { observer } from 'mobx-react';
import {createAutoSubscriber} from 'firebase-nest';
import firebase from 'firebase';

import Radar from './components/Radar';
import logo from './logo.svg';
import './App.css';

const subscriptionKey = 'radar';
const collectionPath = 'radarItems';

const fbApp = firebase.initializeApp({
  apiKey: 'AIzaSyAu0xzmhWQyMfVNXFzJmVL3bPHcrVaSAkM',
  authDomain: "localhost",
  databaseURL: 'https://tech-radar-b0653.firebaseio.com',
  storageBucket: 'tech-radar-b0653.firebaseio.com'
}, "techRadar");
 
const store = new MobxFirebaseStore(firebase.database(fbApp).ref());


class App extends Component {
  state = { 
    radar: []
  };

  componentDidMount() {
    this.getCurrentRadar();
  }

  // componentWillMount() {
  //   this.store = new TweetStore(this.props.config); //create a new instance of the store by passingin the Firebase config
  // }

  addThing() {
    store.fb.child(collectionPath).push({hello: 'from ui'});
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
    const messages = store.getData(subscriptionKey); //'radar' matches the subKey below 
    
    //autoSubscriber keeps track of loading and error status when using store.subscribeSubsWithPromise 
    const { _autoSubscriberFetching: fetching, _autoSubscriberError: fetchError, error } = this.state

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
        <div>
          {!messages && <p>waiting for messages</p>}
          {messages && JSON.stringify(messages, null, 2)}
        </div>
        <div><button onClick={() => this.addThing()}>cats</button>
        </div>
        {radar.length ? <Radar items={radar} updateItem={this.updateItem} /> : <p>probably should add some data</p>}
      </div>
    );
  }
}

//Subscribe to and observe firebase data 
export default createAutoSubscriber({
  getSubs: (props, state) => [{
    subKey: subscriptionKey, //any unique string describing this subscription; must match getData call 
    asList: true, //or asValue: true. asList will internally subscribe via firebase child_added/removed/changed; asValue via onValue. 
    path: collectionPath, //firebase location, 
    
    //Optional - get data callbacks after store data is already updated: 
    onData: (type, snapshot) => console.log('got data: ', type, 'myMsgs', snapshot.val())
  }], 
  
  subscribeSubs: (subs, props, state) => store.subscribeSubsWithPromise(subs)
})(observer(App));
