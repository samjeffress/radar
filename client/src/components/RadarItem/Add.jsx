import React, { Component } from 'react';
import { Input } from 'reactstrap';
import Dropdown from 'react-dropdown'
import PropTypes from 'prop-types';
import {quadrants} from '../../constants';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      ring: '',
      quadrant: '',
      reason: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFrom(targetName) {
    return eventWithoutTarget => {
      eventWithoutTarget.target = { name: targetName, value: eventWithoutTarget.value };
      this.handleChange(eventWithoutTarget);
    }
  }

  handleChange(event) {
    console.log('event', event);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.adderOfThings({
      name: this.state.name, 
      ring: this.state.ring, 
      quadrant: this.state.quadrant,
      reason: this.state.reason
    })
    event.preventDefault();
  }

  render() {
    const { id, name, quadrant, ring, updateItem } = this.props;

    const ringOptions = [
      { value: 'betthefarm', label: 'betthefarm' },
      { value: 'adopt', label: 'adopt' },
      { value: 'hold', label: 'hold' },
      { value: 'bin', label: 'bin' }
    ];

    const quadrantOptions = [
      { value: quadrants.TOOLS, label: quadrants.TOOLS },
      { value: quadrants.TECHNIQUES, label: quadrants.TECHNIQUES },
      { value: quadrants.PLATFORMS, label: quadrants.PLATFORMS },
      { value: quadrants.LANGUAGES, label: quadrants.LANGUAGES }
    ];

    return (
      <div className="RadarItem">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Quadrant:
            <Dropdown 
              options={quadrantOptions} 
              onChange={this.handleChangeFrom('quadrant')} 
              value={this.state.quadrant} 
              placeholder="Select an option" 
            />
          </label>
          <label>
            Ring: 
            <Dropdown 
              options={ringOptions} 
              onChange={this.handleChangeFrom('ring')} 
              value={this.state.ring} 
              placeholder="Select an option" 
            />
          </label>
          <label>
            Reason: 
            <input type="text" name="reason" value={this.state.reason} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

Add.propTypes = {
  name: PropTypes.string,
  quadrant: PropTypes.string,
  ring: PropTypes.string,
  reason: PropTypes.string,
  adderOfThings: PropTypes.func
}

export default Add;
