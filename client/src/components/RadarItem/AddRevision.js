import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, Label, Col, Input} from 'reactstrap';
import Dropdown from 'react-dropdown'
import PropTypes from 'prop-types';

class RadarItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      newRing: '',
      newReason: ''
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
    this.props.updateItem(this.props.name, this.state.newRing, this.state.newReason);
    event.preventDefault();
  }

  render() {
    const { name, newRing, newReason } = this.props;

    return (
      <div className="RadarItem">

        <Form outline onSubmit={this.handleSubmit}>
          <FormGroup row>
          <Label  sm={2} for="newRing">Ring</Label>
            <Col sm={10}>          
              <Input 
                id="newRing"
                name="newRing"
                type="select"
                onChange={this.handleChange} 
                value={this.state.newRing} 
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
            <Label  sm={2} for="newReason">Reason</Label>
            <Col sm={10}>          
              <Input type="text" name="newReason" id="newReason" value={this.state.newReason} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
            <Button color="warning" onClick={this.props.cancelAdd}>Cancel</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

RadarItem.propTypes = {
  name: PropTypes.string,
}

export default RadarItem;
