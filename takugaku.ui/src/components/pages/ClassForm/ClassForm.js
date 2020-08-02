import './ClassForm.scss';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import subjectData from '../../../helpers/data/subjectData';
import scheduleData from '../../../helpers/data/scheduleData';

class ClassForm extends React.Component {
    state = {
      subjectId: '',
      dayOfWeek: '',
      timeSlot: '',
      classTitle: '',
      studentId: '',
      subjects: [],
      invalidClass: false,
      studentSchedule: [],
      scheduleArray: [],
      assignments: [],
      editMode: false,
      noSubject: false,
      subjectTitle: '',
    }

    classTitleChange = (e) => {
      e.preventDefault();
      this.setState({ classTitle: e.target.value });
    }

    timeSlotChange = (e) => {
      e.preventDefault();
      this.setState({ timeSlot: e.target.value });
    }

    subjectChange = (e) => {
      e.preventDefault();
      this.setState({ subjectId: e.target.value });
    }

    getSubjects = () => {
      const { classId } = this.props.match.params;
      subjectData.getAllSubjects()
        .then((response) => {
          response.sort((a, b) => {
            if (a.subjectType < b.subjectType) return -1;
            if (a.subjectType > b.subjectType) return 1;
            return 0;
          });
          this.setState({ subjects: response });
          if (classId) {
            for (let i = 0; i < response.length; i += 1) {
              if (this.state.subjectId === response[i].subjectId) {
                this.setState({ subjectTitle: response[i].subjectType });
              }
            }
          }
        })
        .catch((error) => console.error(error, 'error from getSubjects'));
    }

    getScheduleById = () => {
      const { studentId } = this.state;
      scheduleData.getScheduleByStudentId(studentId)
        .then((response) => {
          const schedule = response;
          for (let i = 0; i < response.length; i += 1) {
            schedule[i].assignment = { assignmentTitle: '' };
          }
          this.setState({ studentSchedule: schedule });
          this.buildSchedule();
        })
        .catch((error) => console.error(error, 'error from getschedulebyid'));
    }

      buildSchedule = () => {
        const { dayOfWeek } = this.state;
        const { studentSchedule } = this.state;
        const newArray = [
          { timeSlot: '08:00:00', assignment: { assignmentTitle: '' } },
          { timeSlot: '09:00:00', assignment: { assignmentTitle: '' } },
          { timeSlot: '10:00:00', assignment: { assignmentTitle: '' } },
          { timeSlot: '11:00:00', assignment: { assignmentTitle: '' } },
          { timeSlot: '12:00:00', assignment: { assignmentTitle: '' } },
          { timeSlot: '13:00:00', assignment: { assignmentTitle: '' } },
          { timeSlot: '14:00:00', assignment: { assignmentTitle: '' } },
          { timeSlot: '15:00:00', assignment: { assignmentTitle: '' } },
        ];

        for (let i = 0; i < studentSchedule.length; i += 1) {
          const time = studentSchedule[i].timeSlot.split('T')[1];
          studentSchedule[i].timeSlot = time;
          for (let j = 0; j < newArray.length; j += 1) {
            if (studentSchedule[i].timeSlot === newArray[j].timeSlot && dayOfWeek === studentSchedule[i].dayOfWeek) {
              newArray[j] = studentSchedule[i];
            }
          }
        }
        this.setState({ scheduleArray: newArray });
        this.checkAssignment();
      }

      checkAssignment = () => {
        const newArray = this.state.scheduleArray;
        const { assignments } = this.state;
        const {
          studentId,
          selectedDate,
        } = this.state;
        const selectedDay = this.state.dayOfWeek;

        for (let i = 0; i < assignments.length; i += 1) {
          const assignmentDate = assignments[i].dateAssigned.split('T');
          if (assignmentDate[0] === selectedDate) {
            for (let j = 0; j < newArray.length; j += 1) {
              if (assignments[i].classId === newArray[j].classId) {
                newArray[j].assignment = assignments[i];
              }
            }
          }
        }
        this.setState({ scheduleArray: newArray });
        this.props.history.push({
          pathname: `/schedule/${studentId}`,
          state: {
            scheduleArray: newArray, selectedDay, selectedDate: this.props.location.state.selectedDate, assignments,
          },
        });
      }

    saveClassEvent = () => {
      const subjectId = parseInt(this.state.subjectId, 10);
      const timeSlot = `1900-01-01T${this.state.timeSlot}`;
      const newClass = {
        studentId: this.state.studentId,
        subjectId,
        dayOfWeek: this.state.dayOfWeek,
        timeSlot,
        classTitle: this.state.classTitle,
      };
      if (this.state.subjectId === 'null' || this.state.subjectId === '') {
        this.setState({ noSubject: true });
      } else {
        scheduleData.addClass(newClass)
          .then((response) => {
            if (response.data === 'That class already exists, class not added.') {
              this.setState({ invalidClass: true });
            } else {
              this.getScheduleById();
              this.setState({ invalidClass: false });
            }
          })
          .catch((error) => console.error('err from save profile', error));
      }
    }

    classUpdateEvent = () => {
      const { classId } = this.props.match.params;
      const subjectId = parseInt(this.state.subjectId, 10);
      const timeSlot = `1900-01-01T${this.state.timeSlot}`;
      const updatedClass = {
        studentId: this.state.studentId,
        subjectId,
        dayOfWeek: this.state.dayOfWeek,
        timeSlot,
        classTitle: this.state.classTitle,
      };
      scheduleData.updateClass(classId, updatedClass)
        .then(() => {
          this.getScheduleById();
          this.setState({ invalidClass: false });
        })
        .catch((error) => console.error(error, 'error from classupdate'));
    }

    checkEditOrCreate = (e) => {
      e.preventDefault();
      const { editMode } = this.state;
      if (editMode) {
        this.classUpdateEvent();
      } else {
        this.saveClassEvent();
      }
    }

    componentDidMount() {
      const { classId } = this.props.match.params;
      this.getSubjects();
      this.setState({ timeSlot: this.props.location.state.timeSlot });
      this.setState({ studentId: this.props.location.state.student.studentId });
      this.setState({ dayOfWeek: this.props.location.state.selectedDay });
      this.setState({ assignments: this.props.location.state.assignments });

      if (classId) {
        this.setState({ timeSlot: this.props.location.state.classSlot.timeSlot });
        this.setState({ classTitle: this.props.location.state.classSlot.classTitle });
        this.setState({ subjectId: this.props.location.state.classSlot.subjectId });
        this.setState({ editMode: true });
      }
    }

    render() {
      const { student, selectedDay } = this.props.location.state;
      const {
        classTitle,
        subjects,
        timeSlot,
        invalidClass,
        noSubject,
        subjectId,
        subjectTitle,
        editMode,
      } = this.state;

      return (
            <div className="ClassForm">
            { !this.props.teacherLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
              : ('')}
            { invalidClass ? (<div className="warning">There is already a class scheduled for that time! Please pick a different day/time.</div>)
              : ('')}
                {editMode ? (<h1>Edit {student.firstName}'s {selectedDay} schedule.</h1>)
                  : (<h1>Add a class to {student.firstName}'s {selectedDay} schedule.</h1>)}
                <div className="container">
                <form className="formContainer" onSubmit={this.checkEditOrCreate}>
                <div className="form-inline d-flex justify-content-center">
                    <div className="form-group row justify-content-center">
                    <label htmlFor="classTitle" className="col-form-label">Class Title:</label>
                    <input
                        type="text"
                        className="form-control m-2"
                        id="classTitle"
                        value={classTitle}
                        onChange={this.classTitleChange}
                        placeholder="Enter Title for Class"
                        required
                        >
                    </input>
                </div>
                </div>
                <div className="form-inline d-flex justify-content-center">
                <div className="col-auto my-1">
                <label htmlFor="timeSlot" className="col-form-label">Time Slot:</label>
                <select type="select" className="custom-select mr-sm-2" id="timeSlot" onChange={this.timeSlotChange} required>
                    <option defaultValue={timeSlot}>{moment(timeSlot, 'HH:mm:ss').format('h:mm:ss A')}</option>
                    <option value="08:00:00">8:00 A.M.</option>
                    <option value="09:00:00">9:00 A.M.</option>
                    <option value="10:00:00">10:00 A.M.</option>
                    <option value="11:00:00">11:00 A.M.</option>
                    <option value="12:00:00">12:00 P.M.</option>
                    <option value="13:00:00">1:00 P.M.</option>
                    <option value="14:00:00">2:00 P.M.</option>
                    <option value="15:00:00">3:00 P.M.</option>
                </select>
                </div>
                </div>
                <div className="form-inline d-flex justify-content-center">
                  { noSubject ? (<div className="warning">Please choose a subject!</div>)
                    : ('') }
                <div className="col-auto my-1">
                <label htmlFor="subject" className="col-form-label">Subject:</label>
                <select type="select" className="custom-select mr-sm-2" id="subject" onChange={this.subjectChange} required>
                    { editMode ? (<option defaultValue={subjectId}>{subjectTitle}</option>)
                      : (<option defaultValue='null'>Choose...</option>)}
                    {subjects.map((subject) => (<option key={subject.subjectId} value={subject.subjectId}>{subject.subjectType}</option>))}
                </select>
                </div>
                </div>
                <div className="buttonContainer">
                { editMode ? (<Button variant="secondary" className="formButton" type="submit">Save Changes</Button>)
                  : (<Button variant="secondary" className="formButton" type="submit">Add Class</Button>)}
                </div>
                </form>
                </div>
            </div>
      );
    }
}

export default ClassForm;
