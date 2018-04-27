import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Select } from 'reactstrap';
import Dropdown from 'react-dropdown'
import PropTypes from 'prop-types';
import {quadrants} from '../../constants';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      description: '', 
      ring: '',
      quadrant: '',
      reason: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.adderOfThings({
      name: this.state.name, 
      description: this.state.description,
      ring: this.state.ring, 
      quadrant: this.state.quadrant,
      reason: this.state.reason
    })
    event.preventDefault();
  }

  render() {
    const { id, name, description, quadrant, ring, updateItem } = this.props;

    return (
      <div className="RadarItem">
        <Form outline onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label  sm={2} for="name">Name</Label>
            <Col sm={10}>          
              <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label  sm={2} for="description">Description</Label>
            <Col sm={10}>          
              <Input type="text" name="description" id="description" value={this.state.description} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup row>
          <Label  sm={2} for="quadrant">Quadrant</Label>
            <Col sm={10}>          
              <Input 
                id="quadrant"
                name="quadrant"
                type="select"
                onChange={this.handleChange} 
                value={this.state.quadrant} 
              >
                <option></option>
                <option>{quadrants.TOOLS}</option>
                <option>{quadrants.TECHNIQUES}</option>
                <option>{quadrants.PLATFORMS}</option>
                <option>{quadrants.LANGUAGES}</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
          <Label  sm={2} for="ring">Ring</Label>
            <Col sm={10}>          
              <Input 
                id="ring"
                name="ring"
                type="select"
                onChange={this.handleChange} 
                value={this.state.ring} 
              >
                <option></option>
                <option>betthefarm</option>
                <option>adopt</option>
                <option>hold</option>
                <option>bin</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label  sm={2} for="reason">Reason</Label>
            <Col sm={10}>          
              <Input type="text" name="reason" id="reason" value={this.state.reason} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
            <Button color="warning" onClick={this.props.cancelAdd}>Cancel</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

Add.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  quadrant: PropTypes.string,
  ring: PropTypes.string,
  reason: PropTypes.string,
  adderOfThings: PropTypes.func
}

export default Add;
