import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import AddRevision from './AddRevision';

const styles = {
  card: {
    minWidth: 275,
    marginBottom: 20,
    textAlign: 'left'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  }
};

class ItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddRevision: false,
      showHistory: false
    }
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.toggleHistory = this.toggleHistory.bind(this);
  }

  toggleUpdate() {
    this.setState({showAddRevision: !this.state.showAddRevision});
  }

  toggleHistory() {
    this.setState({showHistory: !this.state.showHistory});
  }

  render() {
    const { item, addRevision, classes } = this.props;
    return (
      <Card key={`${item.name}-${item.ring}`} className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">{item.name}</Typography>
          <Typography color="textSecondary">{item.ring}. Updated at {item.updatedAt}</Typography>
          <Typography component="p">{item.description}</Typography>
          {!this.state.showAddRevision && <Button color="primary"onClick={() => this.toggleUpdate()}>Update</Button>}
          {this.state.showAddRevision && <AddRevision name={item.name} cancelAdd={this.toggleUpdate} updateItem={this.props.updateItem} />}
          {' '}
          <Button color="secondary" onClick={() => this.toggleHistory()}>{this.state.showHistory ? 'Hide' : 'Show'} History</Button>
          <ExpansionPanel expanded={this.state.showHistory}>
            <ExpansionPanelDetails>
              <Table>
                <TableBody>
                  {item.history.map((h, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{h.ring}</TableCell>
                        <TableCell>{h.reason}</TableCell>
                        <TableCell>{moment(h.date).fromNow()}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
    );
  }
}

ItemView.propTypes = {
  item: PropTypes.object,
  addRevision: PropTypes.func
}
export default withStyles(styles)(ItemView);

