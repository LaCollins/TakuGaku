import './AssignmentsAdd.scss';
import React from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import assignmentData from '../../../helpers/data/assignmentData';

class AssignmentsAdd extends React.Component {
    state = {
      classes: [],
      classId: '',
      assignmentTypeId: '',
      subjectId: '',
      assignedDate: '',
      dueDate: '',
      details: '',
      url: '',
      dayOfWeek: '',
      dayOfSelectedDate: '',
      weekDayArray: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      filteredClasses: [],
      daysMatch: true,
      title: '',
      studentId: '',
      invalidAssignment: false,
    }

    classChange = (e) => {
      e.preventDefault();
      const classInfo = e.target.value.split(' ');
      this.setState({ classId: classInfo[0] });
      this.setState({ subjectId: classInfo[1] });
    }

    weekdayChange = (e) => {
      e.preventDefault();
      this.setState({ dayOfWeek: e.target.value });
      this.checkClassDay(e.target.value);
    }

    assignmentTypeChange = (e) => {
      e.preventDefault();
      this.setState({ assignmentTypeId: e.target.value });
    }

    linkChange = (e) => {
      e.preventDefault();
      this.setState({ url: e.target.value });
    }

    titleChange = (e) => {
      e.preventDefault();
      this.setState({ title: e.target.value });
    }

    detailsChange = (e) => {
      e.preventDefault();
      this.setState({ details: e.target.value });
    }

    assginedDateChange = (e) => {
      e.preventDefault();
      this.setState({ assignedDate: e.target.value });
      this.checkSelectedDateDay(e.target.value);
    }

    dueDateChange = (e) => {
      e.preventDefault();
      this.setState({ dueDate: e.target.value });
    }

    checkClassDay = (dayOfWeek) => {
      const { classes } = this.state;
      const filteredClasses = [];
      for (let i = 0; i < classes.length; i += 1) {
        if (dayOfWeek === classes[i].dayOfWeek) {
          filteredClasses.push(classes[i]);
        }
      }
      this.setState({ filteredClasses });
    }

    checkSelectedDateDay = (day) => {
      const { dayOfWeek } = this.state;
      const selectedDay = moment(day).format('dddd').toLowerCase();
      if (selectedDay === dayOfWeek) {
        this.setState({ daysMatch: true });
      } else {
        this.setState({ daysMatch: false });
      }
      this.setState({ dayOfSelectedDate: selectedDay });
    }

    removeLunch = () => {
      const { classes } = this.props;
      for (let i = 0; i < classes.length; i += 1) {
        if (classes[i].subjectId === 12) {
          classes.splice(i, 1);
        }
      }
      this.sortClasses(classes);
    }

    sortClasses = (classes) => {
      classes.sort((a, b) => {
        if (a.dayOfWeek < b.dayOfWeek) return -1;
        if (a.dayOfWeek > b.dayOfWeek) return 1;
        return 0;
      });
      classes.sort((a, b) => {
        if (a.classTitle < b.classTitle) return -1;
        if (a.classTitle > b.classTitle) return 1;
        return 0;
      });
      this.setState({ classes });
    }

    saveAssignmentEvent = (e) => {
      e.preventDefault();
      const {
        details, assignedDate, dueDate, url, title,
      } = this.state;
      const studentId = parseInt(this.state.studentId, 10);
      const subjectId = parseInt(this.state.subjectId, 10);
      const classId = parseInt(this.state.classId, 10);
      const assignmentTypeId = parseInt(this.state.assignmentTypeId, 10);
      const newAssignment = {
        studentId,
        classId,
        assignmentTypeId,
        subjectId,
        instructions: details,
        completed: false,
        grade: 0,
        dateAssigned: assignedDate,
        dateDue: dueDate,
        dateComplete: '1900-01-01T00:00:00',
        assignmentTitle: title,
        link: url,
      };
      assignmentData.addAssignment(newAssignment)
        .then((response) => {
          if (response.data === 'There is already an existing assignment') {
            this.setState({ invalidAssignment: true });
          } else {
            this.setState({ invalidAssignment: false });
            this.getSchedule();
          }
        })
        .catch((error) => console.error(error));
    }

    getSchedule = () => {
      const { filteredClasses } = this.state;
      for (let i = 0; i < filteredClasses.length; i += 1) {
        filteredClasses[i].assignment = { assignmentTitle: '' };
      }
      this.buildSchedule(filteredClasses);
    }

        buildSchedule = (filteredClasses) => {
          const classes = filteredClasses;
          const { dayOfWeek } = this.state;
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

          for (let i = 0; i < classes.length; i += 1) {
            const time = classes[i].timeSlot.split('T')[1];
            classes[i].timeSlot = time;
            for (let j = 0; j < newArray.length; j += 1) {
              if (classes[i].timeSlot === newArray[j].timeSlot && dayOfWeek === classes[i].dayOfWeek) {
                newArray[j] = classes[i];
              }
            }
          }
          this.props.checkAssignment(newArray, this.state.assignedDate, this.state.dayOfWeek);
        }

        componentDidMount() {
          this.removeLunch();
          this.setState({ assignments: this.props.assignments });
          this.setState({ studentId: this.props.selectedStudent });
        }

        render() {
          const {
            assignedDate,
            weekDayArray,
            filteredClasses,
            dayOfWeek,
            dueDate,
            daysMatch,
            details,
            url,
            title,
            invalidAssignment,
          } = this.state;
          const { assignmentTypes } = this.props;

          return (
            <div className="AssignmentsAdd container">
                <h3>Add Assignment</h3>
                <form className="formContainer" onSubmit={this.saveAssignmentEvent}>
                <div className="form-inline d-flex justify-content-center">
                <div className="col-auto ml-2">
                <label htmlFor="class" className="col-form-label">Day of the Week:</label>
                <select type="class" className="custom-select mr-sm-2" id="class" onChange={this.weekdayChange} required>
                  <option defaultValue="">Choose...</option>
                  {weekDayArray.map((weekday) => (<option key={weekday} value={weekday}>{weekday}</option>))}
                </select>
                { dayOfWeek === '' ? ('')
                  : (<div className="classSelector"><label htmlFor="class" className="col-form-label">Class:</label>
                 <select type="class" className="custom-select mr-sm-2" id="class" onChange={this.classChange} required>
                  <option defaultValue="">Choose...</option>
                  {filteredClasses.map((classSlot) => (<option key={classSlot.classId} value={`${classSlot.classId} ${classSlot.subjectId}`}>{classSlot.classTitle}</option>))}
                </select></div>)}
                <label htmlFor="assignmentType" className="col-form-label">Assignment Type:</label>
                <select type="assignmentType" className="custom-select mr-sm-2" id="assignmentType" onChange={this.assignmentTypeChange} required>
                  <option defaultValue="">Choose...</option>
                  {assignmentTypes.map((at) => (<option key={at.assignmentTypeId} value={at.assignmentTypeId}>{at.assignmentType}</option>))}
                </select>
                { daysMatch ? ('')
                  : (<div className="warning">The date you selected is not a {dayOfWeek}! Please select an appropriate date!</div>)}
                <label htmlFor="dateAssigned" className="col-form-label">Date Assgined:</label>
                <input
                    type="date"
                    className="form-control m-2"
                    id="dateAssigned"
                    value={assignedDate}
                    onChange={this.assginedDateChange}
                    placeholder="Select A Date"
                    required
                    >
                </input>
                <label htmlFor="dateDue" className="col-form-label">Due Date:</label>
                <input
                    type="date"
                    className="form-control m-2"
                    id="dateDue"
                    value={dueDate}
                    onChange={this.dueDateChange}
                    placeholder="Select A Date"
                    required
                    >
                </input>
                <label htmlFor="title" className="col-form-label">Assignment Title:</label>
                    <input className="form-control" id="title" type="text" value={title} onChange={this.titleChange} placeholder="Fun With Numbers" required></input>
                <label htmlFor="details" className="col-form-label">Assignment Instructions:</label>
                    <textarea className="form-control" id="details" rows="4" value={details} onChange={this.detailsChange} required></textarea>
                <label htmlFor="link" className="col-form-label">Assignment URL:</label>
                    <input className="form-control" id="link" type="url" value={url} onChange={this.linkChange}></input>
                <div className="buttonContainer">
                    {invalidAssignment ? (<div className="warning">There is already an assignment for that class day.</div>)
                      : ('')}
                { daysMatch ? (<Button variant="secondary" className="formButton" type="submit">Add Assignment</Button>)
                  : (<Button variant="secondary" disabled className="formButton" type="submit">Add Assignment</Button>)}
                </div>
                </div>
                </div>
                </form>
            </div>
          );
        }
}

export default AssignmentsAdd;
