import React, { Component } from 'react';
import { Button, Col, ModalFooter, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';


export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      bucketID: '',
      task: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.editToDo = this.editToDo.bind(this);
  }

  componentWillReceiveProps(props){
    this.setState({
      bucketID : props.toDo.bid,
      task: props.toDo.toDo
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  editToDo() {
    this.props.editToDo(this.props.toDo.tid, this.state.task, this.state.bucketID);
  }

  render() {
    return (
      <Modal isOpen={this.props.isEdit && this.props.toDo.isEdit} >
        < ModalHeader>Edit Question</ModalHeader>
        <ModalBody >
          <Form>
            <FormGroup row>
              <Col sm={4}>
                <Label for="selectBucket">Select Bucket</Label>
              </Col>
              <Col sm={4}>
                <Input type="select" name="bucketID" id="selectBucket" value={this.props.toDo.bid} onChange={this.handleChange} required>
                  <option required>Select</option>
                  {this.props.bucketList.map(bucket => (
                    <option key={bucket.bid} value={bucket.bid}>{bucket.bname}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label for='task'>Edit Task</Label>
              </Col>
              <Col sm={4}>
                <Input type='textarea' name='task' defaultValue={this.props.toDo.toDo} onChange={this.handleChange} required />
              </Col>
            </FormGroup>
          </Form>

          <ModalFooter>
            <Button onClick={this.editToDo}>Update ToDo</Button>
            {/* <Button onClick={this.props.closeModal}>Close</Button> */}
          </ModalFooter>
        </ModalBody>
      </Modal>
    );
  }
}
