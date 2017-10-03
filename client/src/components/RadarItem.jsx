import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RadarItem extends Component {

  render() {
    const { name, quadrant, ring } = this.props;

    return (
      <div className="RadarItem">
        <h3>{name}</h3>
      </div>
    );
  }
}

RadarItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  quadrant: PropTypes.string,
  ring: PropTypes.string,
  updatedAt: PropTypes.instanceOf(Date),
  history: PropTypes.array
}

export default RadarItem;
