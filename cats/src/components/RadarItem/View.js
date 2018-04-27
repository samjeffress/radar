import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText, Collapse, Table } from 'reactstrap';
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
        <Collapse isOpen={this.state.showHistory}>
          <Table>
            <tbody>
              {item.history.map(h => {
                return (
                  <tr>
                    <td>{h.ring}</td>
                    <td>{h.reason}</td>
                    <td>{moment(h.date).fromNow()}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Collapse>

      </Card>
    );
  }
}

ItemView.propTypes = {
  item: PropTypes.object,
  addRevision: PropTypes.func
}

export default ItemView;

