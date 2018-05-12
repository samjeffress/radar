import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quadrant from '../Quadrant'
import {quadrants} from '../../constants';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Radar extends Component {
  render() {
    const { items, updateItem, classes } = this.props;

    const tools = items.filter(i => i.quadrant === quadrants.TOOLS)
    const techniques = items.filter(i => i.quadrant === quadrants.TECHNIQUES)
    const platforms = items.filter(i => i.quadrant === quadrants.PLATFORMS)
    const languages = items.filter(i => i.quadrant === quadrants.LANGUAGES)

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Quadrant name='tools' items={tools} updateItem={updateItem} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Quadrant name='techniques' items={techniques} updateItem={updateItem} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Quadrant name='platforms' items={platforms} updateItem={updateItem} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Quadrant name='languages' items={languages} updateItem={updateItem} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Radar.propTypes = {
  items: PropTypes.array.isRequired,
  updateItem: PropTypes.func
}

export default withStyles(styles)(Radar);
