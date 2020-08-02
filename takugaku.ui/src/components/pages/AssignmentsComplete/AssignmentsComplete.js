import './AssignmentsComplete.scss';
import React from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AssignmentTable from '../../shared/AssignmentTable/AssignmentTable';
import assignmentData from '../../../helpers/data/assignmentData';

class AssignmentsComplete extends React.Component {
  state = {
    pointsPossible: 100,
    pointsRecieved: 100,
    gradeModalShow: false,
    selectedAssignmentId: '',
    gpa: 0,
    extraCredit: 0,
  }

  pointsPossibleChange = (e) => {
    e.preventDefault();
    this.setState({ pointsPossible: e.target.value }, () => this.calculatePercentage());
  }

  pointsRecievedChange = (e) => {
    e.preventDefault();
    this.setState({ pointsRecieved: e.target.value }, () => this.calculatePercentage());
  }

  extraCreditChange = (e) => {
    e.preventDefault();
    this.setState({ extraCredit: e.target.value }, () => this.calculatePercentage());
  }

  setGradeModalShow = (assignmentId) => {
    this.setState({ gradeModalShow: true });
    this.setState({ selectedAssignmentId: assignmentId });
  }

  calculatePercentage = () => {
    const totalPoints = parseFloat(this.state.pointsRecieved) + parseFloat(this.state.extraCredit);
    const gradePercentage = (totalPoints / this.state.pointsPossible) * 100;
    this.calculateGPA(gradePercentage);
  }

  calculateGPA = (gradePercentage) => {
    let gpa = 0;
    if (gradePercentage >= 97) {
      gpa = 4.0;
    } else if (gradePercentage >= 93 && gradePercentage < 97) {
      gpa = 3.8;
    } else if (gradePercentage >= 90 && gradePercentage < 93) {
      gpa = 3.7;
    } else if (gradePercentage >= 87 && gradePercentage < 90) {
      gpa = 3.3;
    } else if (gradePercentage >= 83 && gradePercentage < 87) {
      gpa = 3.0;
    } else if (gradePercentage >= 80 && gradePercentage < 83) {
      gpa = 2.7;
    } else if (gradePercentage >= 77 && gradePercentage < 80) {
      gpa = 2.3;
    } else if (gradePercentage >= 73 && gradePercentage < 77) {
      gpa = 2.0;
    } else if (gradePercentage >= 70 && gradePercentage < 73) {
      gpa = 1.7;
    } else if (gradePercentage >= 67 && gradePercentage < 70) {
      gpa = 1.3;
    } else if (gradePercentage >= 65 && gradePercentage < 67) {
      gpa = 1.0;
    } else if (gradePercentage < 65) {
      gpa = 0.0;
    }
    this.setState({ gpa });
  }

  updateGrade = (e) => {
    e.preventDefault();
    const { gpa } = this.state;
    const { selectedAssignmentId } = this.state;
    assignmentData.updateGrade(selectedAssignmentId, gpa)
      .then(() => {
        this.props.getCompleteAssignments(this.props.selectedStudent);
        this.setState({ gradeModalShow: false });
      })
      .catch((error) => console.error(error));
  }

  AddGradeModal = (props) => (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="gradeModal"
        centered>
        <Modal.Header closeButton>
            <Modal.Title id="gradeModal">
                Add Grade
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="formContainer" onSubmit={this.updateGrade}>
                <div className="form-inline d-flex justify-content-center">
                    <div className="form-group row justify-content-around">
                    <label htmlFor="pointsPossible" className="col-form-label">Possible Points:</label>
                    <input
                        type="number"
                        className="form-control m-2"
                        id="pointsPossible"
                        value={this.state.pointsPossible}
                        onChange={this.pointsPossibleChange}
                        placeholder="100"
                        required
                        >
                    </input>
                    <label htmlFor="pointsRecieved" className="col-form-label">Points Recieved:</label>
                    <input
                        type="number"
                        className="form-control m-2"
                        id="pointsRecieved"
                        value={this.state.pointsRecieved}
                        onChange={this.pointsRecievedChange}
                        placeholder="100"
                        required
                        >
                    </input>
                  </div>
                <div className="form-group row justify-content-center">
                    <label htmlFor="extraCredit" className="col-form-label">Extra Credit:</label>
                    <input
                        type="number"
                        className="form-control m-2"
                        id="extraCredit"
                        value={this.state.extraCredit}
                        onChange={this.extraCreditChange}
                        placeholder="0"
                        >
                    </input>
                    </div>
                </div>
                <Modal.Footer>
                <div className="buttonContainer">
                <Button variant="secondary" className="formButton" type="submit">Submit Grade</Button>
                </div>
                </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
  );

  render() {
    const { completedAssignments, studentView } = this.props;
    const { gradeModalShow } = this.state;
    return (
            <div className="AssignmentsComplete">
                <h3>Completed Assignments</h3>
                <div className="container">
                    <this.AddGradeModal show={gradeModalShow} onHide={() => this.setState({ gradeModalShow: false })} />
                    <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Class Name</th>
                        <th>Assignment</th>
                        <th>Assignment Type</th>
                        <th>Date Assigned</th>
                        <th>Date Complete</th>
                        <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedAssignments.map((assignment) => <AssignmentTable
                            key={assignment.assignmentId}
                            assignment={assignment}
                            complete={true}
                            studentView={studentView}
                            setGradeModalShow={this.setGradeModalShow}
                             />)}
                    </tbody>
                    </Table>
                </div>
            </div>
    );
  }
}

export default AssignmentsComplete;
