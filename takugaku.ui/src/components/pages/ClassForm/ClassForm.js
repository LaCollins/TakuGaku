import './ClassForm.scss';
import React from 'react';
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
      weekly: false,
    }

    changeWeekly = (e) => {
      const checkedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      this.setState({ weekly: checkedValue });
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
      subjectData.getAllSubjects()
        .then((response) => {
          response.sort((a, b) => {
            if (a.subjectType < b.subjectType) return -1;
            if (a.subjectType > b.subjectType) return 1;
            return 0;
          });
          this.setState({ subjects: response });
          if (this.props.editMode) {
            for (let i = 0; i < response.length; i += 1) {
              if (this.state.subjectId === response[i].subjectId) {
                this.setState({ subjectTitle: response[i].subjectType });
              }
            }
          }
        })
        .catch((error) => console.error(error, 'error from getSubjects'));
    }

    saveClassEvent = () => {
      const subjectId = parseInt(this.state.subjectId, 10);
      const timeSlot = `1900-01-01T${this.state.timeSlot}`;

      if (this.state.weekly) {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        const promises = [];
        for (let i = 0; i < days.length; i += 1) {
          const newClass = {
            studentId: this.state.studentId,
            subjectId,
            dayOfWeek: days[i],
            timeSlot,
            classTitle: this.state.classTitle,
          };
          promises.push(scheduleData.addClass(newClass).then((response) => {
            if (response.data === 'A class already exists at that time, class not added.') {
              this.setState({ invalidClass: true });
            }
          }));
        }
        Promise.all(promises).then(() => {
          this.props.getScheduleById();
          this.props.setClassModalHide();
          this.setState({ invalidClass: false });
        });
      } else {
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
              if (response.data === 'A class already exists at that time, class not added.') {
                this.setState({ invalidClass: true });
              } else {
                this.props.getScheduleById();
                this.props.setClassModalHide();
                this.setState({ invalidClass: false });
              }
            })
            .catch((error) => console.error('err from save profile', error));
        }
      }
    }

    classUpdateEvent = () => {
      const { classId } = this.props.classSlot;
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
          this.props.getScheduleById();
          this.props.setClassModalHide();
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
      this.getSubjects();
      this.setState({ timeSlot: this.props.timeSlot });
      this.setState({ studentId: this.props.student.studentId });
      this.setState({ dayOfWeek: this.props.selectedDay });
      this.setState({ assignments: this.props.assignments });

      if (this.props.editMode) {
        this.setState({ timeSlot: this.props.timeSlot });
        this.setState({ classTitle: this.props.classSlot.classTitle });
        this.setState({ subjectId: this.props.classSlot.subjectId });
        this.setState({ editMode: true });
        this.getSubjects();
      }
    }

    render() {
      const { student, selectedDay, timeSlot } = this.props;
      const {
        classTitle,
        subjects,
        invalidClass,
        noSubject,
        subjectId,
        subjectTitle,
        editMode,
        weekly,
      } = this.state;

      return (
            <div className="ClassForm">
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
                </select>\
                { editMode ? ('')
                  : (<div class="form-check">
                <input type="checkbox" class="form-check-input" id="weekly" checked={weekly} onChange={this.changeWeekly} />
                <label class="form-check-label" for="weekly">Occurs Daily</label>
                </div>)}
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
