import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScatterplotChart } from 'react-easy-chart';
import RadarItem from './RadarItem';
import {quadrants} from '../constants';

const bigData = [
  {
    type: 'One',
    x: 1,
    y: 5
  },
  {
    type: 'Two',
    x: 3,
    y: 1
  },
  {
    type: 'Three',
    x: 0,
    y: 6
  },
  {
    type: 'Four',
    x: 5,
    y: 2
  },
  {
    type: 'Five',
    x: 4,
    y: 4
  },
  {
    type: 'Six',
    x: 5,
    y: 9
  },
  {
    type: 'Seven',
    x: 9,
    y: 1
  },
  {
    type: 'Eight',
    x: 5,
    y: 6
  },
  {
    type: 'Nine',
    x: 3,
    y: 9
  },
  {
    type: 'Ten',
    x: 7,
    y: 9
  }
];

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
  render() {
    const { name, items } = this.props;
    const chartSeries = [{
      field: 'id'
    }]
console.log('items', items)
    return (
      <div className={`Quadrant${name}`}>
        <h4>{name}</h4>

        <ScatterplotChart
          data={items}
          config={config}
          dotRadius={20}
          width={400}
          height={200}
        />
      </div>
    );
  }
}

Quadrant.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array
}

export default Quadrant;
