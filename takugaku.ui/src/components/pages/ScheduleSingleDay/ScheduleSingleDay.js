import React from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import scheduleData from '../../../helpers/data/scheduleData';
import studentData from '../../../helpers/data/studentData';
import ClassTable from '../../shared/ClassTable/ClassTable';
import './ScheduleSingleDay.scss';

class ScheduleSingleDay extends React.Component {
    state = {
      studentId: 0,
      student: [],
      selectedDay: '',
      selectedDate: '',
      assignments: [],
      scheduleArray: [
        { timeSlot: '08:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '09:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '10:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '11:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '12:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '13:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '14:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '15:00:00', assignment: { assignmentTitle: '' } },
      ],
    }

    getStudentById = () => {
      const { studentId } = this.props.match.params;
      studentData.getStudentById(studentId)
        .then((response) => this.setState({ student: response }))
        .catch((error) => console.error(error));
    }

    deleteClass = (classId) => {
      const classArray = this.state.scheduleArray;
      let timeSlot = '';
      scheduleData.deleteClassById(classId)
        .then(() => {
          for (let i = 0; i < classArray.length; i += 1) {
            if (classArray[i].classId === classId) {
              timeSlot = classArray[i].timeSlot;
              classArray[i] = { timeSlot, assignment: { assignmentTitle: '' } };
            }
          }
          this.setState({ scheduleArray: classArray });
        })
        .catch((error) => console.error(error));
    }

    checkDate = () => {
      const { selectedDate } = this.props.location.state;
      this.setState({ selectedDate });
    }

    componentDidMount() {
      const { studentId } = this.props.match.params;
      const { scheduleArray } = this.props.location.state;
      const { selectedDate } = this.props.location.state;
      const { selectedDay } = this.props.location.state;
      const { assignments } = this.props.location.state;

      this.setState({ selectedDate, selectedDay, assignments });

      this.setState({ studentId });
      this.setState({ scheduleArray });

      this.getStudentById();

      this.checkDate();
    }

    render() {
      const {
        student,
        selectedDay,
        scheduleArray,
        selectedDate,
        assignments,
      } = this.state;

      const viewingDate = moment(selectedDate).format('MMMM Do YYYY');
      return (
            <div className="ScheduleSingleDay">
            { !this.props.teacherLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
              : ('')}
                <h1>Daily Schedule</h1>
                <h4>{student.firstName}'s Class Schedule for {selectedDay.toUpperCase()}</h4>
                <h5 className="mb-4">You are currently viewing assignments for {viewingDate}</h5>
                <div className="container">
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
                        {scheduleArray.map((classSlot) => <ClassTable key={classSlot.timeSlot}
                        student={student}
                        classSlot={classSlot}
                        selectedDate={selectedDate}
                        selectedDay={selectedDay}
                        assignments={assignments}
                        deleteClass={this.deleteClass} />)}
                    </tbody>
                    </Table>
                </div>
                { this.props.teacherLoggedIn ? (<div className="buttonContainer"><Link to="/manage/schedules" className="btn btn-secondary">Back</Link></div>)
                  : ('')}
            </div>
      );
    }
}

export default ScheduleSingleDay;
