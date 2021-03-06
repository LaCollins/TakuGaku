import './AssignmentsMain.scss';
import { Redirect } from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import studentData from '../../../helpers/data/studentData';
import assignmentData from '../../../helpers/data/assignmentData';
import AssignmentsAdd from '../AssignmentsAdd/AssignmentsAdd';
import AssignmentsDue from '../AssignmentsDue/AssignmentsDue';
import scheduleData from '../../../helpers/data/scheduleData';
import AssignmentsComplete from '../AssignmentsComplete/AssignmentsComplete';

class AssignmentsMain extends React.Component {
    state = {
      students: [],
      showAdd: false,
      showDue: false,
      showComplete: false,
      selectedStudent: '',
      classes: [],
      assignmentTypes: [],
      assignments: [],
      noClasses: false,
      dueAssignments: [],
      completedAssignments: [],
      studentView: false,
    }

    deleteAssingment = (assignmentId) => {
      const { selectedStudent } = this.state;
      assignmentData.deleteAssignment(assignmentId)
        .then(() => {
          this.getDueAssignments(selectedStudent);
          this.getDueAssignments(selectedStudent);
        })
        .catch((error) => console.error(error, 'error from deleteAssignment'));
    }

    studentChange = (e) => {
      e.preventDefault();
      this.setState({ selectedStudent: e.target.value });
      scheduleData.getScheduleByStudentId(e.target.value)
        .then((response) => {
          if (response === 'no classes found') {
            this.setState({ noClasses: true, classes: [] });
          } else {
            this.setState({ classes: response, noClasses: false });
            this.getAssignments(this.state.selectedStudent);
            this.getDueAssignments(this.state.selectedStudent);
            this.getCompleteAssignments(this.state.selectedStudent);
          }
        })
        .catch((error) => console.error(error, 'error from studentChange'));
    }

    getAssignmentTypes = () => {
      assignmentData.getAssignmentType()
        .then((response) => {
          response.sort((a, b) => {
            if (a.assignmentType < b.assignmentType) return -1;
            if (a.assignmentType > b.assignmentType) return 1;
            return 0;
          });
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

      removeArchived = (assignments) => {
        for (let i = 0; i < assignments.length; i += 1) {
          if (assignments[i].classId === 53) {
            assignments.splice(i, 1);
          }
        }
        this.setState({ assignments });
      }

      getAssignments = (studentId) => {
        assignmentData.getAssignmentByStudentId(studentId)
          .then((assignments) => {
            this.removeArchived(assignments);
          })
          .catch(() => this.setState({ assignments: [] }));
      }

      getDueAssignments = (studentId) => {
        assignmentData.getDueAssignmentsByStudentId(studentId)
          .then((response) => {
            const assignments = response;
            const filteredAssignments = assignments.filter((assignment) => assignment.className !== 'archive');
            this.setState({ dueAssignments: filteredAssignments });
          })
          .catch(() => this.setState({ dueAssignments: [] }));
      }

      getCompleteAssignments = (studentId) => {
        assignmentData.getCompletedAssignmentsByStudentId(studentId)
          .then((response) => {
            const assignments = response.sort((a, b) => {
              if (a.className < b.className) return -1;
              if (a.className > b.className) return 1;
              return 0;
            });
            const filteredAssignments = assignments.filter((assignment) => assignment.className !== 'archive');
            this.setState({ completedAssignments: filteredAssignments });
          })
          .catch(() => this.setState({
            completedAssignments: [],
          }));
      }

      showAddAssignment = (e) => {
        e.preventDefault();
        this.setState({ showAdd: true });
        this.setState({ showDue: false });
        this.setState({ showComplete: false });
      }

      showDueAssignment = (e) => {
        e.preventDefault();
        this.setState({ showAdd: false });
        this.setState({ showDue: true });
        this.setState({ showComplete: false });
      }

      showCompleteAssignment = (e) => {
        e.preventDefault();
        this.setState({ showAdd: false });
        this.setState({ showDue: false });
        this.setState({ showComplete: true });
      }

      checkAssignment = (classArray, selectedDate, selectedDay) => {
        const newArray = classArray;
        const studentId = this.state.selectedStudent;

        assignmentData.getAssignmentByStudentId(studentId)
          .then((assignments) => {
            for (let i = 0; i < assignments.length; i += 1) {
              if (assignments[i].classId === 53) {
                assignments.splice(i, 1);
              }
              const assignmentDate = assignments[i].dateAssigned.split('T');
              if (assignmentDate[0] === selectedDate) {
                for (let j = 0; j < newArray.length; j += 1) {
                  if (assignments[i].classId === newArray[j].classId) {
                    newArray[j].assignment = assignments[i];
                  }
                }
              }
            }
            this.props.history.push({
              pathname: `/manage/schedules/${studentId}`,
              state: {
                scheduleArray: newArray, selectedDay, selectedDate, assignments,
              },
            });
          })
          .catch((error) => console.error(error));
      }

      componentDidMount() {
        const { studentId } = this.props.match.params;
        if (studentId) {
          this.getAssignmentTypes();
          this.getAssignments(studentId);
          this.getDueAssignments(studentId);
          this.getCompleteAssignments(studentId);
          this.setState({ studentView: true });
        } else {
          this.getStudents();
          this.getAssignmentTypes();
          this.setState({ studentView: false });
        }
      }

      render() {
        const {
          students,
          showAdd,
          showDue,
          classes,
          assignmentTypes,
          assignments,
          selectedStudent,
          noClasses,
          dueAssignments,
          showComplete,
          completedAssignments,
          studentView,
        } = this.state;

        return (
            <div className="AssignmentsMain">
                { !this.props.teacherLoggedIn && !this.props.studentLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
                  : ('')}
                <h1>Assignments</h1>
                <div className="form-inline d-flex justify-content-around">
                <div className="col-auto ml-2">
                { this.props.teacherLoggedIn ? (<div><label htmlFor="student" className="col-form-label">Student:</label>
                <select type="select" className="custom-select mr-sm-2" id="student" onChange={this.studentChange} required>
                  <option defaultValue="">Choose...</option>
                  {students.map((student) => (<option key={student.studentId} value={student.studentId}>{student.firstName}</option>))}
                </select></div>)
                  : ('')}
                <div className="buttonContainer">
                <table>
                    <tr>
                      { !this.props.studentLoggedIn ? (<td>
                        { showAdd ? ('')
                          : (<Button variant="secondary" className="formButton mr-3" onClick={this.showAddAssignment}>Add</Button>)}
                        </td>)
                        : ('')}
                        <td>
                        { showDue ? ('')
                          : (<Button variant="secondary" className="formButton mr-3" onClick={this.showDueAssignment}>Due</Button>)}
                        </td>
                        <td>
                        { showComplete ? ('')
                          : (<Button variant="secondary" className="formButton mr-3" onClick={this.showCompleteAssignment}>Completed</Button>) }
                        </td>
                    </tr>
                </table>
                </div>
                </div>
                </div>
                { noClasses ? (<div className="warning mt-5">This student has no classes! Please add a class to continue.</div>)
                  : ('') }
                { showAdd && !noClasses ? (<AssignmentsAdd
                    classes={classes}
                    assignmentTypes={assignmentTypes}
                    assignments={assignments}
                    selectedStudent={selectedStudent}
                    checkAssignment={this.checkAssignment}
                    editMode={false}
                    />)
                  : ('')}
                { showDue && !noClasses ? (<AssignmentsDue
                    classes={classes}
                    assignmentTypes={assignmentTypes}
                    assignments={assignments}
                    dueAssignments={dueAssignments}
                    selectedStudent={selectedStudent}
                    checkAssignment={this.checkAssignment}
                    deleteAssignment={this.deleteAssingment}
                    getDueAssignments={this.getDueAssignments}
                    studentView={studentView} />)
                  : ('')}
                { showComplete && !noClasses ? (<AssignmentsComplete
                    classes={classes}
                    assignmentTypes={assignmentTypes}
                    assignments={assignments}
                    completedAssignments={completedAssignments}
                    selectedStudent={selectedStudent}
                    studentView={studentView}
                    getCompleteAssignments={this.getCompleteAssignments} />)
                  : ('')}
            </div>
        );
      }
}

export default AssignmentsMain;
