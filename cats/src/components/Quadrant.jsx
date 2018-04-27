import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemView from './RadarItem/View';
import {quadrants} from '../constants';

// Date.parse is baaad mmkay
const byMostRecentDate = (historyA, historyB) => (Date.parse(historyA.date) < Date.parse(historyB.date));
const ringSort = (itemA, itemB) => (itemA.ring > itemB.ring);

const flattenItem = (item) => {
  const itemFlat = {...item};
  itemFlat.history.sort(byMostRecentDate);
  itemFlat.ring = itemFlat.history.length ? itemFlat.history[0].ring : 'bin';
  itemFlat.updatedAt = itemFlat.history.length ? itemFlat.history[0].date : '';
  return itemFlat;
}

class Quadrant extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, items, updateItem } = this.props;
    const flattenedSortedItems = items.map(flattenItem).sort(ringSort);
    return (
      <div className={`Quadrant${name}`}>
        <h3>{name}</h3>
        {flattenedSortedItems.map(item => { return(
          <ItemView updateItem={this.props.updateItem} item={item} key={`${item.name}-${item.ring}`} />
        )})}
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


