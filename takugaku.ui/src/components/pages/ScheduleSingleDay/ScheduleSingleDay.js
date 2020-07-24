import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import scheduleData from '../../../helpers/data/scheduleData';
import studentData from '../../../helpers/data/studentData';
import ClassTable from '../../shared/ClassTable/ClassTable';
import './ScheduleSingleDay.scss';

class ScheduleSingleDay extends React.Component {
    state = {
      studentId: 0,
      student: [],
      selectedDay: '',
      studentSchedule: [],
      scheduleArray: [
        { timeSlot: '08:00:00' },
        { timeSlot: '09:00:00' },
        { timeSlot: '10:00:00' },
        { timeSlot: '11:00:00' },
        { timeSlot: '12:00:00' },
        { timeSlot: '13:00:00' },
        { timeSlot: '14:00:00' },
        { timeSlot: '15:00:00' },
      ],
    }

    getStudentById = () => {
      const { studentId } = this.props.match.params;
      studentData.getStudentById(studentId)
        .then((response) => this.setState({ student: response }))
        .catch((error) => console.error(error));
    }

    getScheduleById = () => {
      const { studentId } = this.props.match.params;
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
      const { scheduleArray } = this.state;

      for (let i = 0; i < studentSchedule.length; i += 1) {
        const time = studentSchedule[i].timeSlot.split('T')[1];
        studentSchedule[i].timeSlot = time;
        for (let j = 0; j < scheduleArray.length; j += 1) {
          if (studentSchedule[i].timeSlot === scheduleArray[j].timeSlot && selectedDay === studentSchedule[i].dayOfWeek) {
            scheduleArray[j] = studentSchedule[i];
          }
        }
      }
    }

    setDayOfWeek = () => {
      const { selectedDay } = this.props.location.state;
      const dateString = selectedDay.toString().split(' ');
      const weekDay = dateString[0];
      if (weekDay === 'Mon') {
        this.setState({ selectedDay: 'monday' });
      } else if (weekDay === 'Tue') {
        this.setState({ selectedDay: 'tuesday' });
      } else if (weekDay === 'Wed') {
        this.setState({ selectedDay: 'wednesday' });
      } else if (weekDay === 'Thu') {
        this.setState({ selectedDay: 'thursday' });
      } else if (weekDay === 'Fri') {
        this.setState({ selectedDay: 'friday' });
      } else if (weekDay === 'Sat') {
        this.setState({ selectedDay: 'saturday' });
      } else if (weekDay === 'Sun') {
        this.setState({ selectedDay: 'sunday' });
      }
    }

    componentDidMount() {
      const { studentId } = this.props.match.params;

      this.setState({ studentId });

      this.setDayOfWeek();

      this.getScheduleById();

      this.getStudentById();
    }

    render() {
      const { student, selectedDay, scheduleArray } = this.state;
      return (
            <div className="ScheduleSingleDay">
                <h1>Daily Schedule</h1>
                <h4>{student.firstName}'s Class Schedule for {selectedDay.toUpperCase()}</h4>
                <div className="container">
                <Button variant="secondary" className="scheduleButton">Add a Class</Button>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Time</th>
                        <th>Class Name</th>
                        <th>Assignment</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleArray.map((classSlot) => <ClassTable key={classSlot.timeSlot} classSlot={classSlot} />)}
                    </tbody>
                    </Table>
                </div>
            </div>
      );
    }
}

export default ScheduleSingleDay;
