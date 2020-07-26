import React from 'react';
import Calendar from 'react-calendar';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './StudentCalendar.scss';
import 'react-calendar/dist/Calendar.css';
import studentData from '../../../helpers/data/studentData';
import assignmentData from '../../../helpers/data/assignmentData';
import scheduleData from '../../../helpers/data/scheduleData';

class StudentCalendar extends React.Component {
  state = {
    selectedDay: new Date(),
    weekDay: '',
    students: [],
    selectedStudent: '',
    singleStudent: [],
    selectedDate: '',
    assignments: '',
    scheduleArray: [],
    studentSchedule: [],
  }

  studentChange = (e) => {
    e.preventDefault();
    this.setState({ selectedStudent: e.target.value });
    this.getAssignment(e.target.value);
  }

  getStudents = () => {
    const { schoolId } = this.props.school;
    studentData.getStudentBySchoolId(schoolId)
      .then((response) => {
        this.setState({ students: response });
      })
      .catch((error) => console.error(error));
  }

  selectDate = (date) => {
    const weekDay = date.toDateString().split(' ');
    this.setState({ weekDay: weekDay[0] });
    if (weekDay[0] === 'Mon') {
      this.setState({ selectedDay: 'monday' });
    } else if (weekDay[0] === 'Tue') {
      this.setState({ selectedDay: 'tuesday' });
    } else if (weekDay[0] === 'Wed') {
      this.setState({ selectedDay: 'wednesday' });
    } else if (weekDay[0] === 'Thu') {
      this.setState({ selectedDay: 'thursday' });
    } else if (weekDay[0] === 'Fri') {
      this.setState({ selectedDay: 'friday' });
    } else if (weekDay[0] === 'Sat') {
      this.setState({ selectedDay: 'saturday' });
    } else if (weekDay[0] === 'Sun') {
      this.setState({ selectedDay: 'sunday' });
    }
    this.convertDateToNumbers(date);
  }

  getCurrentDay = () => {
    const selectedDay = new Date();
    const weekDay = selectedDay.toDateString().split(' ');
    this.setState({ weekDay: weekDay[0] });
    if (weekDay[0] === 'Mon') {
      this.setState({ selectedDay: 'monday' });
    } else if (weekDay[0] === 'Tue') {
      this.setState({ selectedDay: 'tuesday' });
    } else if (weekDay[0] === 'Wed') {
      this.setState({ selectedDay: 'wednesday' });
    } else if (weekDay[0] === 'Thu') {
      this.setState({ selectedDay: 'thursday' });
    } else if (weekDay[0] === 'Fri') {
      this.setState({ selectedDay: 'friday' });
    } else if (weekDay[0] === 'Sat') {
      this.setState({ selectedDay: 'saturday' });
    } else if (weekDay[0] === 'Sun') {
      this.setState({ selectedDay: 'sunday' });
    }
    this.convertDateToNumbers(selectedDay);
  }

  convertDateToNumbers = (date) => {
    const dateString = date.toDateString().split(' ');
    const longMonth = dateString[1];
    const day = dateString[2];
    const year = dateString[3];
    let month = '';
    if (longMonth === 'Jan') {
      month = '01';
    } else if (longMonth === 'Feb') {
      month = '02';
    } else if (longMonth === 'Mar') {
      month = '03';
    } else if (longMonth === 'Apr') {
      month = '04';
    } else if (longMonth === 'May') {
      month = '05';
    } else if (longMonth === 'Jun') {
      month = '06';
    } else if (longMonth === 'Jul') {
      month = '07';
    } else if (longMonth === 'Aug') {
      month = '08';
    } else if (longMonth === 'Sep') {
      month = '09';
    } else if (longMonth === 'Oct') {
      month = '10';
    } else if (longMonth === 'Nov') {
      month = '11';
    } else if (longMonth === 'Dec') {
      month = '12';
    }

    const newDateString = `${year}-${month}-${day}`;

    this.setState({ selectedDate: newDateString });
  }

  getAssignment = (studentId) => {
    assignmentData.getAssignmentByStudentId(studentId)
      .then((assignments) => {
        this.setState({ assignments });
      })
      .catch((error) => console.error(error));
  }

  getScheduleById = () => {
    const studentId = this.state.selectedStudent;
    scheduleData.getScheduleByStudentId(studentId)
      .then((response) => {
        this.setState({ studentSchedule: response });
        this.buildSchedule();
      })
      .catch((error) => console.error(error, 'error from getschedulebyid'));
  }

  buildSchedule = () => {
    const { selectedDay } = this.state;
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
        if (studentSchedule[i].timeSlot === newArray[j].timeSlot && selectedDay === studentSchedule[i].dayOfWeek) {
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
      selectedStudent,
      selectedDay,
      selectedDate,
    } = this.state;

    for (let i = 0; i < assignments.length; i += 1) {
      const assignmentDate = assignments[i].dateAssigned.split('T');
      if (assignmentDate[0] === selectedDate) {
        for (let j = 0; j < newArray.length; j += 1) {
          if (assignments[i].classId === newArray[j].classId) {
            newArray[j].assignment = assignments[i];
          } else {
            newArray[j].assignment = { assignmentTitle: '' };
          }
        }
      }
    }
    this.setState({ scheduleArray: newArray });
    this.props.history.push({ pathname: `/schedule/${selectedStudent}`, state: { scheduleArray: newArray, selectedDay, selectedDate } });
  }

  getStudentScheduleEvent = () => {
    this.getScheduleById();
  }

  componentDidMount() {
    const { studentId } = this.props.match.params;
    this.getStudents();
    if (studentId) {
      this.getAssignment(studentId);
      this.setState({ selectedStudent: studentId });
      studentData.getStudentById(studentId)
        .then((response) => {
          this.setState({ singleStudent: response });
        })
        .catch((error) => console.error(error));
    }
    this.getCurrentDay();
  }

  render() {
    const {
      students,
      selectedStudent,
      singleStudent,
    } = this.state;

    const { studentId } = this.props.match.params;

    return (
            <div className="Calendar container">
              { !this.props.teacherLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
                : ('')}
                <h1>Class Schedule</h1>
                <div className="form-inline d-flex justify-content-around">
                <div className="col-auto my-2">
                <label htmlFor="student" className="col-form-label">Student:</label>
                <select type="select" className="custom-select mr-sm-2" id="student" onChange={this.studentChange} required>
                { (studentId) ? (<option defaultValue={studentId}>{singleStudent.firstName}</option>)
                  : (<option defaultValue="">Choose...</option>)}
                    {students.map((student) => (<option key={student.studentId} value={student.studentId}>{student.firstName}</option>))}
                </select>
                </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <h4>Select a Day</h4>
                </div>
                <div className="row d-flex justify-content-center">
                  <Calendar calendarType="US" onChange={this.selectDate} value={this.state.date} formatLongDate={this.formatDate}/>
                </div>
                <div className="row d-flex justify-content-around mt-4 buttonContainer">
                  { selectedStudent === '' ? (<Button variant="secondary" disabled className="scheduleButton">View Class Schedule</Button>)
                    : (<Button variant="secondary" className="scheduleButton" onClick={this.getStudentScheduleEvent}>View Class Schedule</Button>)}
                  <Button variant="secondary" className="scheduleButton">Add a Class</Button>
                </div>
            </div>
    );
  }
}

export default StudentCalendar;
