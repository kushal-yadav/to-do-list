import React, { Component } from 'react';
import { Button, Col, ModalFooter, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';


export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      newBucketName: '',
      bucketID: '',
      task: '',
      addBucket: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.addNewBucket = this.addNewBucket.bind(this);
    this.addNewToDo = this.addNewToDo.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "selectBucket") {
      this.setState({
        bucketID: event.target.value
      });
    }
    else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  addNewBucket() {
    if (this.state.newBucketName !== '') {
      this.props.addBucket(this.state.newBucketName);
      this.setState({
        newBucketName: ''
      });
    }
    else {
      alert("Please enter the bucket name");
    }
  }

  addNewToDo() {
    if (this.state.bucketID !== '' && this.state.task !== '') {
      this.props.addNewToDo(this.state.task, this.state.bucketID);
      this.setState({
        task: '',
        bucketID: ''
      });
    }
    else {
      if (this.state.bucketID === '') {
        alert("Please select bucket");
      }
      if (this.state.task === '') {
        alert("Please enter task before adding");
      }
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpenModal} className="modalBody">
        <ModalHeader>New To Do Task</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <span>
              <ul>
                <li>Please add new bucket before adding task.</li>
                <li>Once a bucket is created you will have choice to select it.</li>
              </ul>
            </span>
            <Col sm={4}>
              <Label for='bucket'>Enter Bucket</Label>
            </Col>
            <Col sm={4}>
              < Input type='text' name='newBucketName' value={this.state.newBucketName} onChange={this.handleChange} required />
            </Col>
            <Button onClick={this.addNewBucket} className={"mb-2 text-right"}>Add New Bucket</Button>
          </FormGroup>
          <Form>
            <FormGroup row>
              <Col sm={4}>
                <Label for="selectBucket">Select Bucket</Label>
              </Col>
              <Col sm={4}>
                <Input type="select" name="selectBucket" id="selectBucket" value={this.state.bucketID} onChange={(e) => this.handleChange(e)} required>
                  <option required>Select</option>
                  {this.props.bucketList.map(bucket => (
                    <option key={bucket.bid} value={bucket.bid}>{bucket.bname}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label for='task' >Add Task</Label>
              </Col>
              <Col sm={4}>
                <Input type='textarea' name='task' value={this.state.task} onChange={(e) => this.handleChange(e)} required />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.addNewToDo}>Add ToDo</Button>
          <Button onClick={this.props.closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
