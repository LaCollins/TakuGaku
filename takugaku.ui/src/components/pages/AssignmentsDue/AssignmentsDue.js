import './AssignmentsDue.scss';
import React from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import AssignmentTable from '../../shared/AssignmentTable/AssignmentTable';
import AssignmentsAdd from '../AssignmentsAdd/AssignmentsAdd';
import assignmentData from '../../../helpers/data/assignmentData';
import SingleAssignment from '../../shared/SingleAssignment/SingleAssignment';

class AssignmentsDue extends React.Component {
    state = {
      modalShow: false,
      assignmentToEditId: '',
      singleAssignment: [],
    }

    setModalShow = () => {
      this.setState({ modalShow: true });
    }

    setModalHide = () => {
      this.props.getDueAssignments(this.props.selectedStudent);
      this.setState({ modalShow: false });
    }

    setAssignmentToEdit = (assignmentToEditId) => {
      assignmentData.getSingleAssignment(assignmentToEditId)
        .then((response) => {
          this.setState({ singleAssignment: response });
          this.setState({ assignmentToEditId });
          this.setModalShow();
        })
        .catch((error) => console.error(error, 'error from setAssignmentToEdit'));
    }

    AddAssignmentModal = (props) => (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Assignment
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AssignmentsAdd
                    classes={this.props.classes}
                    assignmentTypes={this.props.assignmentTypes}
                    assignments={this.props.assignments}
                    selectedStudent={this.props.selectedStudent}
                    singleAssignment={this.state.singleAssignment}
                    checkAssignment={this.props.checkAssignment}
                    editMode={true}
                    setModalHide={this.setModalHide}/>
                </Modal.Body>
            </Modal>
    );

    render() {
      const {
        dueAssignments, studentView,
      } = this.props;
      const { modalShow } = this.state;

      return (
            <div className="AssignmentsDue">
                <h3>Due Assignments</h3>
                <div className="container">
                    <this.AddAssignmentModal show={modalShow} onHide={() => this.setState({ modalShow: false })} />
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Class Name</th>
                        <th>Assignment</th>
                        <th>Assignment Type</th>
                        <th>Date Assigned</th>
                        <th>Date Due</th>
                      { studentView ? ('')
                        : (<th>Actions</th>) }
                        </tr>
                    </thead>
                    <tbody>
                        {dueAssignments.map((assignment) => <AssignmentTable
                            key={assignment.assignmentId}
                            assignment={assignment}
                            deleteAssignment={this.props.deleteAssignment}
                            setAssignmentToEdit={this.setAssignmentToEdit}
                            complete={false}
                            studentView={studentView}
                            setViewAssignment={this.setViewAssignment}
                             />)}
                    </tbody>
                    </Table>
                </div>
            </div>
      );
    }
}

export default AssignmentsDue;
