import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScatterplotChart } from 'react-easy-chart';
import { Table, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import RadarItem from './RadarItem';
import {quadrants} from '../constants';

const config = [
  {
    type: quadrants.TOOLS,
    color: '#ff0000',
    stroke: 'blue'
  },
  {
    type: quadrants.TECHNIQUES,
    color: '#00ff00',
    stroke: 'blue'
  },
  {
    type: quadrants.PLATFORMS,
    color: '#ffffff',
    stroke: 'black'
  },
  {
    type: quadrants.LANGUAGES,
    color: '#ab3ab3',
    stroke: 'red'
  }
];

class Quadrant extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      popoverOpen: false
    };
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.toggle = this.toggle.bind(this);
  }


  mouseOverHandler(d, e) {
    console.log('d', d)
    console.log('e', e)
    console.log('target', e.target)
    this.setState({
      popoverOpen: true,
      popoverTitle: d.name,
      popoverElement: e.toElement,
      popoverBody: `${d.quadrant} - ${d.name}`,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x,
      item: d
    });
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
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
            {items.map(item => 
              <tr>
                <td>{item.name}</td>
                <td>{item.ring}</td>
                <td>{item.updatedAt}</td>
              </tr>
            )}
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


