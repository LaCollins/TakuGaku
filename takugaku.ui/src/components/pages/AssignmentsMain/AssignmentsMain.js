import './AssignmentsMain.scss';
import { Redirect } from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import studentData from '../../../helpers/data/studentData';
import assignmentData from '../../../helpers/data/assignmentData';

class AssignmentsMain extends React.Component {
    state = {
      students: [],
    }

      getStudents = () => {
        const { schoolId } = this.props.school;
        studentData.getStudentBySchoolId(schoolId)
          .then((response) => {
            this.setState({ students: response });
          })
          .catch((error) => console.error(error));
      }

      getAssignments = (studentId) => {
        assignmentData.getAssignmentByStudentId(studentId)
          .then((assignments) => {
            this.setState({ assignments });
          })
          .catch((error) => console.error(error));
      }

      componentDidMount() {
        this.getStudents();
      }

      render() {
        const { students } = this.state;

        return (
            <div className="AssignmentsMain">
                { !this.props.teacherLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
                  : ('')}
                <h1>Assignments</h1>
                <div className="form-inline d-flex justify-content-around">
                <div className="col-auto ml-2">
                <label htmlFor="student" className="col-form-label">Student:</label>
                <select type="select" className="custom-select mr-sm-2" id="student" onChange={this.studentChange} required>
                  <option defaultValue="">Choose...</option>
                  {students.map((student) => (<option key={student.studentId} value={student.studentId}>{student.firstName}</option>))}
                </select>
                <div className="buttonContainer">
                <Button variant="secondary" className="formButton mr-3">Add</Button>
                <Button variant="secondary" className="formButton mr-3">Due</Button>
                <Button variant="secondary" className="formButton mr-3">Completed</Button>
                </div>
                </div>
                </div>
            </div>
        );
      }
}

export default AssignmentsMain;
