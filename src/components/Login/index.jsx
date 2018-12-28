import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('event', event);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.loginFirebase(this.state.username, this.state.password)
    event.preventDefault();
  }

  render() {
    const { username, password } = this.props;
    return (
      <div className="LoginForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            Username: 
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Password: 
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  loginFirebase: PropTypes.func
}

export default Login;
