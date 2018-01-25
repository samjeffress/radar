import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScatterplotChart } from 'react-easy-chart';
import { Table, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import RadarItem from './RadarItem';
import {quadrants} from '../constants';

// Date.parse is baaad mmkay
const byMostRecentDate = (historyA, historyB) => (Date.parse(historyA.date) > Date.parse(historyB.date));

class Quadrant extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, items, updateItem } = this.props;
    return (
      <div className={`Quadrant${name}`}>
        <h3>{name}</h3>

        <Table responsive bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Ring</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              const mostRecentHistory = item.history.sort(byMostRecentDate);
              return (
              <tr>
                <td>{item.name}</td>
                <td>{mostRecentHistory.length > 0 && mostRecentHistory[0].ring}</td>
                <td>{mostRecentHistory.length > 0 && mostRecentHistory[0].date}</td>
              </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

Quadrant.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array,
  updateItem: PropTypes.func
}

export default Quadrant;


