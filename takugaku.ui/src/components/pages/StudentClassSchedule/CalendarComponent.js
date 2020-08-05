import React from 'react';
import Calendar from 'react-calendar';
import Button from 'react-bootstrap/Button';
import './StudentClassSchedule.scss';
import 'react-calendar/dist/Calendar.css';
import assignmentData from '../../../helpers/data/assignmentData';
import scheduleData from '../../../helpers/data/scheduleData';

class CalendarComponent extends React.Component {
  state = {
    selectedDay: new Date(),
    weekDay: '',
    selectedStudent: '',
    singleStudent: [],
    selectedDate: '',
    assignments: [],
    scheduleArray: [],
    studentSchedule: [],
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

  getScheduleById = (studentId) => {
    scheduleData.getScheduleByStudentId(studentId)
      .then((response) => {
        let schedule = response;
        if (response === 'no classes found') {
          schedule = [];
        } else {
          for (let i = 0; i < response.length; i += 1) {
            schedule[i].assignment = { assignmentTitle: '' };
          }
        }
        this.setState({ studentSchedule: schedule });
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
    this.setState({ scheduleArray: newArray }, () => {
      this.props.checkAssignment(this.state.scheduleArray, this.state.selectedDay, this.state.selectedDate, this.state.assignments);
    });
  }

  getStudentScheduleEvent = () => {
    this.getScheduleById(this.state.selectedStudent);
  }

  componentDidMount() {
    if (this.props.student) {
      this.getAssignment(this.props.student.studentId);
      this.setState({ selectedStudent: this.props.student.studentId, singleStudent: this.props.student }, () => {
        this.getScheduleById(this.state.selectedStudent);
      });
      this.getCurrentDay();
    }
  }

  render() {
    return (
            <div className="CalendarComponent container">
                <div className="row d-flex justify-content-center">
                  <h4>Select a Day</h4>
                </div>
                <div className="row d-flex justify-content-center">
                  <Calendar calendarType="US" onChange={this.selectDate} value={this.state.date} formatLongDate={this.formatDate}/>
                </div>
                <div className="row d-flex justify-content-around mt-4 buttonContainer">
                <Button variant="secondary" className="scheduleButton" onClick={this.getStudentScheduleEvent}>View Class Schedule</Button>
                </div>
            </div>
    );
  }
}

export default CalendarComponent;
