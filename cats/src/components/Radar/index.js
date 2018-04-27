import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
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
      <Container>
        <Row>
          <Col sm="6"><Quadrant name='tools' items={tools} updateItem={updateItem} /></Col>
          <Col sm="6"><Quadrant name='techniques' items={techniques} updateItem={updateItem} /></Col>
        </Row>
        <Row>
          <Col sm="6"><Quadrant name='platforms' items={platforms} updateItem={updateItem} /></Col>
          <Col sm="6"><Quadrant name='languages' items={languages} updateItem={updateItem} /></Col>
        </Row>
      </Container>
    );
  }
}

Radar.propTypes = {
  items: PropTypes.array.isRequired,
  updateItem: PropTypes.func
}

export default Radar;
