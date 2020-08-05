import React from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { Link } from 'react-router-dom';
import scheduleData from '../../../helpers/data/scheduleData';
import ClassTable from '../../shared/ClassTable/ClassTable';
import './ScheduleSingleDay.scss';

class ScheduleSingleDay extends React.Component {
    state = {
      selectedDay: '',
      selectedDate: '',
      singleStudent: [],
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
      const { selectedDate } = this.props;
      this.setState({ selectedDate });
    }

    componentDidMount() {
      const { scheduleArray } = this.props;
      const { selectedDate } = this.props;
      const { selectedDay } = this.props;
      const { assignments } = this.props;
      const { singleStudent } = this.props;

      this.setState({ selectedDate, selectedDay, assignments });

      this.setState({ scheduleArray, singleStudent });

      this.checkDate();
    }

    render() {
      const {
        singleStudent,
        selectedDay,
        scheduleArray,
        selectedDate,
        assignments,
      } = this.props;

      const viewingDate = moment(selectedDate).format('MMMM Do YYYY');
      return (
            <div className="ScheduleSingleDay">
                <h4>{singleStudent.firstName}'s Class Schedule for {selectedDay.toUpperCase()}</h4>
                <h5 className="mb-4">You are currently viewing assignments for {viewingDate}</h5>
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
                        student={singleStudent}
                        classSlot={classSlot}
                        selectedDate={selectedDate}
                        selectedDay={selectedDay}
                        assignments={assignments}
                        deleteClass={this.deleteClass} />)}
                    </tbody>
                    </Table>
            </div>
      );
    }
}

export default ScheduleSingleDay;
