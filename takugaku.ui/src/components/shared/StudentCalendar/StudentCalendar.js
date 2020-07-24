import React from 'react';
import Calendar from 'react-calendar';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './StudentCalendar.scss';
import 'react-calendar/dist/Calendar.css';
import studentData from '../../../helpers/data/studentData';

class StudentCalendar extends React.Component {
  state = {
    selectedDay: new Date(),
    weekDay: '',
    students: [],
    selectedStudent: '',
  }

  studentChange = (e) => {
    e.preventDefault();
    this.setState({ selectedStudent: e.target.value });
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
    const selectedDay = date.toDateString();
    this.setState({ selectedDay });
    this.setState({ weekDay: weekDay[0] });
  }

  componentDidMount() {
    this.getStudents();
  }

  render() {
    const {
      students,
      selectedStudent,
      selectedDay,
    } = this.state;

    return (
            <div className="Calendar container">
              { !this.props.teacherLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
                : ('')}
                <h1>Class Schedule</h1>
                <div className="form-inline d-flex justify-content-around">
                <div className="col-auto my-2">
                <label htmlFor="student" className="col-form-label">Student:</label>
                <select type="select" className="custom-select mr-sm-2" id="student" onChange={this.studentChange} required>
                    <option defaultValue="">Choose...</option>
                    {students.map((student) => (<option key={student.studentId} value={student.studentId}>{student.firstName}</option>))}
                </select>
                </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <h4>Select a Day</h4>
                </div>
                <div className="row d-flex justify-content-center">
                  <Calendar calendarType="US" onChange={this.selectDate} value={this.state.date} />
                </div>
                <div className="row d-flex justify-content-around mt-4 buttonContainer">
                  { selectedStudent === '' ? (<Button variant="secondary" disabled className="scheduleButton">View Class Schedule</Button>)
                    : (<Link to={{ pathname: `/schedule/${selectedStudent}`, state: { selectedDay } }} className="scheduleButton btn btn-secondary">View Class Schedule</Link>)}
                  <Button variant="secondary" className="scheduleButton">Add a Class</Button>
                </div>
            </div>
    );
  }
}

export default StudentCalendar;
