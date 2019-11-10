import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Card, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
import EditToDo from './EditTodo.jsx'
import CreateTodo from './CreateTodo.jsx'

export default class ToDoList extends React.Component {

  constructor() {
    super();
    this.state = {
      bucketList: [],
      selectBucket: '',
      bucketID: 0,
      newBucketName: '',
      toDoList: [],
      isEdit: false,
      task: '',
      openModal: false,
    }

    this.addBucket = this.addBucket.bind(this);
    this.addNewToDo = this.addNewToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.editToDo = this.editToDo.bind(this);
    this.markToDoComplete = this.markToDoComplete.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      toDoList: [
        { tid: 0, toDo: 'Presentation', bid: 1, isDelete: false, isComplete: false, isEdit: false },
        { tid: 1, toDo: 'Client Call', bid: 1, isDelete: false, isComplete: false, isEdit: false },
        { tid: 2, toDo: 'Pay Bill', bid: 0, isDelete: false, isComplete: false, isEdit: false },
        { tid: 3, toDo: 'Pay Rent', bid: 0, isDelete: false, isComplete: false, isEdit: false }
      ],
      bucketList: [
        { bid: 0, bname: 'Home' },
        { bid: 1, bname: 'Office' }
      ]
    });
  }

  addBucket(newBucketName) {
    const copyOfbucketList = [...this.state.bucketList];
    const bucketListLength = copyOfbucketList.length;
    const newBucket = { bid: bucketListLength, bname: newBucketName };
    copyOfbucketList.push(newBucket);

    this.setState({
      bucketList: copyOfbucketList
    });
  }

  addNewToDo(task, bucketID) {
    const copyOfToDoList = [...this.state.toDoList];
    const toDoListLength = copyOfToDoList.length;
    const newToDo = {
      tid: toDoListLength,
      toDo: task,
      bid: parseInt(bucketID),
      isDelete: false,
      isComplete: false
    }

    copyOfToDoList.push(newToDo);

    this.setState({
      toDoList: copyOfToDoList
    });
  }

  deleteToDo(tid) {
    const copyOfToDoList = [...this.state.toDoList];
    copyOfToDoList.forEach(toDo => {
      if (toDo.tid === tid) {
        toDo.isDelete = true;
      }
    });

    this.setState({
      toDoList: copyOfToDoList
    });
  }

  editToDo(tid, task, bid) {
    const copyOfToDoList = [...this.state.toDoList];
    copyOfToDoList.forEach(toDo => {
      if (toDo.tid === tid) {
        toDo.toDo = task;
        toDo.bid = parseInt(bid);
        toDo.isEdit = false
      }
    });

    this.setState({ toDoList: copyOfToDoList });
  }

  markToDoComplete(tid) {
    const copyOfToDoList = [...this.state.toDoList];
    copyOfToDoList.forEach(toDo => {
      if (toDo.tid === tid) {
        toDo.isComplete = !toDo.isComplete;
      }
    });

    this.setState({
      toDoList: copyOfToDoList
    });
  }

  openModal() {
    this.setState({ openModal: true });
  }

  openEditModal(tid) {
    const copyOfToDoList = [...this.state.toDoList];
    copyOfToDoList.forEach(toDo => {
      if (toDo.tid === tid) {
        toDo.isEdit = true;
      }
    });

    this.setState({
      toDoList: copyOfToDoList,
      isEdit: true
    });
  }

  closeModal() {
    this.setState({ openModal: false, isEdit: false });
  }

  render() {
    if (this.state.bucketList.length > 0) {
      return (
        <>
          <Button className="mt-5 mb-3" onClick={this.openModal}>Create New To-Do</Button>
          <CreateTodo isOpenModal={this.state.openModal} bucketName={this.state.bucketName} closeModal={this.closeModal} bucketList={this.state.bucketList} bucketID={this.state.bucketID} addBucket={this.addBucket} addNewToDo={this.addNewToDo} />
          {this.state.bucketList.map(bucket => (
            <Container key={bucket.bid} className="shadow-lg p-3 text-left mb-3" >
              {bucket.bname}
              <Row >
                {this.state.toDoList.filter(toDo => toDo.bid === bucket.bid && !toDo.isDelete).map(toDo => (
                  <Col md={4} className="p-2" key={toDo.tid}>
                    <Card className="shadow-lg p-3 h-100">
                      <CardBody>
                        <CardTitle className="text-right">
                        </CardTitle>
                        <CardText>
                          {toDo.toDo}
                        </CardText>
                        <CardFooter>
                          {
                            toDo.isComplete
                              // ? <span>Completed</span>
                              ? <Button className="mb-0 rounded-0 mr-1" color="success" onClick={this.markToDoComplete.bind(this, toDo.tid)}>Mark Remaining</Button>
                              : <><Button className="mb-0 rounded-0 mr-1" color="dark" onClick={this.openEditModal.bind(this, toDo.tid)}>Edit</Button>
                                <EditToDo isEdit={this.state.isEdit} bucketList={this.state.bucketList} toDo={toDo} closeModal={this.closeModal} editToDo={this.editToDo} />
                                <Button className="mb-0 rounded-0 mr-1" color="primary" onClick={this.markToDoComplete.bind(this, toDo.tid)}>Mark Done</Button></>
                          }
                          <Button className="mb-0 rounded-0" color="danger" onClick={this.deleteToDo.bind(this, toDo.tid)}>Delete</Button>
                        </CardFooter>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          ))
          }
        </>
      );
    }

    return (
      <>
        <Button className="mt-5 mb-3" onClick={this.openModal}>Create New To-Do</Button>
        <CreateTodo isOpenModal={this.state.openModal} bucketName={this.state.bucketName} closeModal={this.closeModal} bucketList={this.state.bucketList} bucketID={this.state.bucketID} addBucket={this.addBucket} addNewToDo={this.addNewToDo} />
      </>
    );
  }
}