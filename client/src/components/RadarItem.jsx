import React, { Component } from 'react';
import { Input } from 'reactstrap';
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      editMode: !this.state.editMode
    });
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
        <h3>{name}</h3>
        {!this.state.editMode && <button onClick={this.toggle}>Edit</button>}
        {this.state.editMode && (
        <form onSubmit={this.handleSubmit}>
          <label>
            Ring: 
            <Dropdown 
              options={ringOptions} 
              onChange={this.handleChangeFrom('newRing')} 
              value={this.state.newRing} 
              placeholder="Select an option" 
            />
          </label>
          <label>
            Reason: 
            <input type="text" name="newReason" value={this.state.newReason} onChange={this.handleChange} />
          </label>
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
