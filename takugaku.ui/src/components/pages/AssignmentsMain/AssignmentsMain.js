import './AssignmentsMain.scss';
import { Redirect } from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import studentData from '../../../helpers/data/studentData';
import assignmentData from '../../../helpers/data/assignmentData';
import AssignmentsAdd from '../AssignmentsAdd/AssignmentsAdd';
import scheduleData from '../../../helpers/data/scheduleData';

class AssignmentsMain extends React.Component {
    state = {
      students: [],
      showAdd: false,
      selectedStudent: '',
      classes: [],
      assignmentTypes: [],
      assignments: [],
    }

    studentChange = (e) => {
      e.preventDefault();
      this.setState({ selectedStudent: e.target.value });
      scheduleData.getScheduleByStudentId(e.target.value)
        .then((response) => {
          this.setState({ classes: response });
          this.getAssignments(this.state.selectedStudent);
        })
        .catch((error) => console.error(error, 'error from studentchange'));
    }

    getAssignmentTypes = () => {
      assignmentData.getAssignmentType()
        .then((response) => {
          this.setState({ assignmentTypes: response });
        })
        .catch((error) => console.error(error));
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

      showAddAssignment = (e) => {
        e.preventDefault();
        this.setState({ showAdd: true });
      }

      componentDidMount() {
        this.getStudents();
        this.getAssignmentTypes();
      }

      render() {
        const {
          students,
          showAdd,
          classes,
          assignmentTypes,
          assignments,
        } = this.state;

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
                    { showAdd ? ('')
                      : (<Button variant="secondary" className="formButton mr-3" onClick={this.showAddAssignment}>Add</Button>)}
                <Button variant="secondary" className="formButton mr-3">Due</Button>
                <Button variant="secondary" className="formButton mr-3">Completed</Button>
                </div>
                </div>
                </div>
                { showAdd ? (<AssignmentsAdd classes={classes} assignmentTypes={assignmentTypes} assignments={assignments} />)
                  : ('')}
            </div>
        );
      }
}

export default AssignmentsMain;
