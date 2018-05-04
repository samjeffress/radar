import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Collapse, Table } from 'reactstrap';
import Button from 'material-ui/Button';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import moment from 'moment';
import AddRevision from './AddRevision';

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
    const { item, addRevision } = this.props;
    return (
      <Card key={`${item.name}-${item.ring}`} body className="text-left">
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          <CardSubtitle>{item.ring}. Updated at {item.updatedAt}</CardSubtitle>
          <CardText>{item.description}</CardText>
          {!this.state.showAddRevision && <Button onClick={() => this.toggleUpdate()}>Update</Button>}
          {this.state.showAddRevision && <AddRevision name={item.name} cancelAdd={this.toggleUpdate} updateItem={this.props.updateItem} />}
          {' '}
          <Button onClick={() => this.toggleHistory()}>{this.state.showHistory ? 'Hide' : 'Show'} History</Button>
        </CardBody>
        <ExpansionPanel expanded={this.state.showHistory}>
          <ExpansionPanelDetails>
            <Table>
              <tbody>
                {item.history.map((h, index) => {
                  return (
                    <tr key={index}>
                      <td>{h.ring}</td>
                      <td>{h.reason}</td>
                      <td>{moment(h.date).fromNow()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>

      </Card>
    );
  }
}

ItemView.propTypes = {
  item: PropTypes.object,
  addRevision: PropTypes.func
}

export default ItemView;

