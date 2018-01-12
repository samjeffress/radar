import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Dropdown from 'react-dropdown'
import PropTypes from 'prop-types';

class RadarItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editMode: false,
      newRing: '',
      newReason: ''
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeFromTarget = this.handleChangeFromTarget.bind(this);
    this.handleSelectEventFrom = this.handleSelectEventFrom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  handleChangeFromTarget(targetName) {
    return eventWithTarget => {
      eventWithTarget.target.name = targetName;
      this.handleChange(eventWithTarget);
    }
  }

  handleChangeFrom(targetName) {
    return eventWithoutTarget => {
      eventWithoutTarget.target = { name: targetName, value: eventWithoutTarget.value };
      this.handleChange(eventWithoutTarget);
    }
  }

  handleSelectEventFrom(targetName) {
    return eventWithoutTarget => {
      eventWithoutTarget.target = { name: targetName, value: eventWithoutTarget.target.value };
      this.handleChange(eventWithoutTarget);
    }
  }

  handleChange(event) {
    console.log('event', event);
    console.log('target name', event.target.name);
    console.log('target value', event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.updateItem(this.props.id, this.state.newRing, 'def', this.state.newReason)
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

    return (
      <div className="RadarItem">
        {!this.state.editMode && <button onClick={this.toggle}>Edit</button>}
        {this.state.editMode && (
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="newRing">
            <ControlLabel>Ring</ControlLabel>
            <FormControl 
              componentClass="select" 
              placeholder="select a ring"
              onChange={this.handleSelectEventFrom('newRing')}
              value={this.state.newRing}
            >
              {ringOptions.map(r => <option value={r.value}>{r.label}</option>)}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="newReason">
            <ControlLabel>Reason</ControlLabel>
            <FormControl 
              type="text" 
              value={this.state.newReason} 
              onChange={this.handleChangeFromTarget('newReason')}
            />
          </FormGroup>

          <input type="submit" value="Submit" />
        </form>)}
      </div>
    );
  }
}

RadarItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  quadrant: PropTypes.string,
  ring: PropTypes.string,
  updatedAt: PropTypes.instanceOf(Date),
  history: PropTypes.array
}

export default RadarItem;
