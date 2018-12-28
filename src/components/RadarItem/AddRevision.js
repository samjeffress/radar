import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class RadarItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      newRing: '',
      newReason: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {s
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.updateItem(this.props.name, this.state.newRing, this.state.newReason);
    event.preventDefault();
  }

  render() {
    const { name, newRing, newReason, classes } = this.props;

    return (
      <div className="RadarItem">
        <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <TextField
            id="newRing"
            name="newRing"
            select
            label="New Ring"
            className={classes.textField}
            value={this.state.newRing}
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
            id="newReason"
            name="newReason"
            label="Reason"
            className={classes.textField}
            value={this.state.newReason}
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

RadarItem.propTypes = {
  name: PropTypes.string,
}
export default withStyles(styles)(RadarItem);
