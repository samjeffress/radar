import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {quadrants} from '../../constants';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      description: '', 
      ring: '',
      quadrant: '',
      reason: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.adderOfThings({
      name: this.state.name, 
      description: this.state.description,
      ring: this.state.ring, 
      quadrant: this.state.quadrant,
      reason: this.state.reason
    })
    event.preventDefault();
  }

  render() {
    const { id, name, description, quadrant, ring, updateItem, classes } = this.props;

    return (
      <div className="RadarItem">
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="name"
            name="name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange}
            margin="normal"
          />   
          <TextField
            id="description"
            name="description"
            label="Description"
            className={classes.textField}
            value={this.state.description}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            id="quadrant"
            name="quadrant"
            select
            label="Quadrant"
            className={classes.textField}
            value={this.state.quadrant}
            onChange={this.handleChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select the ring"
            margin="normal"
          >
            {[
              quadrants.TOOLS,
              quadrants.TECHNIQUES,
              quadrants.PLATFORMS,
              quadrants.LANGUAGES
            ].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="ring"
            name="ring"
            select
            label="Ring"
            className={classes.textField}
            value={this.state.ring}
            onChange={this.handleChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select the ring"
            margin="normal"
          >
            {[
              'betthefarm',
              'adopt',
              'hold',
              'bin'
            ].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="reason"
            name="reason"
            label="Reason"
            className={classes.textField}
            value={this.state.reason}
            onChange={this.handleChange}
            margin="normal"
          />   
          <div>
            <Button variant="raised" color="primary" onClick={this.handleSubmit} className={classes.button}>
              Submit
            </Button>
            <Button variant="raised" color="secondary" onClick={this.props.cancelAdd} className={classes.button}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Add.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  quadrant: PropTypes.string,
  ring: PropTypes.string,
  reason: PropTypes.string,
  adderOfThings: PropTypes.func
}

export default withStyles(styles)(Add)
