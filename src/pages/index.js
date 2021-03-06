import React, { Component } from 'react';
import MobxFirebaseStore from 'mobx-firebase-store';
import { observer } from 'mobx-react';
import {createAutoSubscriber} from 'firebase-nest';
import firebase from 'firebase';
import { toJS } from 'mobx';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';


import Radar from '../components/Radar';
import Add from '../components/RadarItem/Add';
import Login from '../components/Login';

const subscriptionKey = 'radar';
const collectionPath = 'radarItems';

const fbApp = firebase.initializeApp({
  apiKey: 'AIzaSyAu0xzmhWQyMfVNXFzJmVL3bPHcrVaSAkM',
  authDomain: "localhost",
  databaseURL: 'https://tech-radar-b0653.firebaseio.com',
  storageBucket: 'tech-radar-b0653.firebaseio.com'
}, "techRadar");
 

const twitterAuthProvider = new firebase.auth.TwitterAuthProvider(); 
const store = new MobxFirebaseStore(firebase.database(fbApp).ref());
const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      radar: [], 
      showAdd: false,
      loggedIn: false,
      showLoginForm: false
    };
    this.addThing = this.addThing.bind(this);
    this.addHistoryToThing = this.addHistoryToThing.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);
    this.loginFirebase = this.loginFirebase.bind(this);
    this.login = this.login.bind(this);
  }

  // componentWillMount() {
  //   this.store = new TweetStore(this.props.config); //create a new instance of the store by passingin the Firebase config
  // }

  loginFirebase(username, password) {
    this.login(username, password);
  }

  cancelAdd() {
    if (this.state.showAdd)
      this.hideNew();
  }

  addHistoryToThing(thingKey, ring, reason) {
    const history = {
      ring: ring,
      reason: reason,
      date: new Date().toISOString()
    };
    store.fb.child(`${collectionPath}/${thingKey}/history`).push(history);
  }

  addThing(thingToBeAdded) {
    var o = {
      [thingToBeAdded.name]: {
        name: thingToBeAdded.name, 
        description: thingToBeAdded.description,
        quadrant: thingToBeAdded.quadrant,
        x: randomBetween(0, 80), 
        y: randomBetween(0, 80),
        history: [{
          ring: thingToBeAdded.ring,
          reason: thingToBeAdded.reason,
          date: new Date().toISOString()
        }]
      }
    }
    store.fb.child(collectionPath).update(o);
    if (this.state.showAdd)
      this.hideNew();
  }

  addNew() {
    this.setState({showAdd: true});
  }

  hideNew() {
    this.setState({showAdd: false});
  }

  login(username, password) {
    // fbApp.auth().signInWithPopup(twitterAuthProvider).then(function(result) {
    fbApp.auth().signInWithEmailAndPassword(username, password).then(function(result) {
      console.log('winning', result)
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      // var token = result.credential.accessToken;
      // var secret = result.credential.secret;
      // // The signed-in user info.
      // var user = result.user;
      this.setState({loggedIn: true, showLoginForm: false});
      // ...
    }).catch(function(error) {
      console.log('failing', error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
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
    const radar = messages ? messages.values().map(m => {
      const m2 = {...m};
      // history is a mobx observable - we just want a normal array
      if (m.history) {
        const h = toJS(m.history);
        m2.history = Object.keys(h).map(k => h[k]);
      } else {
        m2.history = [];
      }
      return m2;
    }) : []; 

    return (
      <div className="App">

        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Your Amazing Radar!
            </Typography>
            {' '}{!this.state.loggedIn && !this.state.showLoginForm && <Button color="inherit" onClick={() => this.setState({showLoginForm: true})}>login</Button>}
            <Button color="inherit" onClick={() => this.addNew()}>Add Item</Button>{' '}
          </Toolbar>
        </AppBar>

          <div>
            {!messages && <p>waiting for messages</p>}
          </div>
          <div>
            {!this.state.loggedIn && this.state.showLoginForm && <Login loginFirebase={this.loginFirebase} />}
          </div>
          <div>
            {this.state && this.state.showAdd && 
              <Add cancelAdd={this.cancelAdd} adderOfThings={this.addThing}/>
            }
          </div>
          {radar.length && <Radar items={radar} updateItem={this.addHistoryToThing} />}

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
