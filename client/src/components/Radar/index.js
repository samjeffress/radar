import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quadrant from '../Quadrant'
import {quadrants} from '../../constants';

class Radar extends Component {
  render() {
    const { items, updateItem } = this.props;

    const tools = items.filter(i => i.quadrant === quadrants.TOOLS)
    const techniques = items.filter(i => i.quadrant === quadrants.TECHNIQUES)
    const platforms = items.filter(i => i.quadrant === quadrants.PLATFORMS)
    const languages = items.filter(i => i.quadrant === quadrants.LANGUAGES)

    return (
      <div className="Radar">
        <h3>Wassup, here are some items...</h3>
        <Quadrant name='tools' items={items} updateItem={updateItem} />
      </div>
    );
  }
}

Radar.propTypes = {
  items: PropTypes.array.isRequired,
  updateItem: PropTypes.func
}

export default Radar;
