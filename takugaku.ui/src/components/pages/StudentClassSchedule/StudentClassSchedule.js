import './StudentClassSchedule.scss';
import { Redirect } from 'react-router-dom';
import React from 'react';
import Table from 'react-bootstrap/Table';
import CalendarComponent from './CalendarComponent';
import ClassTable from '../../shared/ClassTable/ClassTable';

class StudentClassSchedule extends React.Component {
    state = {
      student: {},
      scheduleArray: [],
      selectedDay: '',
      selectedDate: '',
      assignments: [],
      viewClassSchedule: false,
    }

    checkAssignment = (scheduleArray, selectedDay, selectedDate, assignments) => {
      const newArray = scheduleArray;
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
      this.setState({
        scheduleArray: newArray, selectedDay, selectedDate, assignments, viewClassSchedule: true,
      });
    }

    SingleDayView = () => (
                  <div className="singleDay">
                      <h4>Class Schedule for {this.state.selectedDay.toUpperCase()}</h4>
                      <div className="container">
                      <Table striped bordered hover variant="dark">
                          <thead>
                              <tr>
                              <th>Time</th>
                              <th>Class Name</th>
                              <th>Assignment</th>
                              </tr>
                          </thead>
                          <tbody>
                              {this.state.scheduleArray.map((classSlot) => <ClassTable key={classSlot.timeSlot}
                              student={this.state.student}
                              classSlot={classSlot}
                              selectedDate={this.state.selectedDate}
                              selectedDay={this.state.selectedDay}
                              assignments={this.state.assignments}
                              studentView={true}
                              />)}
                          </tbody>
                          </Table>
                      </div>
                  </div>
    )

    componentDidMount() {
      this.setState({ student: this.props.student });
    }

    render() {
      const { student } = this.props;
      const { viewClassSchedule } = this.state;
      return (
            <div className="StudentClassSchedule">
            { !this.props.studentLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
              : ('')}
              <h1>Class Schedule</h1>
                <div className="d-flex row">
                    <div className="block1 container w-50">
                    { student === 'undefined' || student === {} ? ('')
                      : (<CalendarComponent student={student} checkAssignment={this.checkAssignment} />)}
                    </div>
                    <div className="block2 container w-50">
                        { viewClassSchedule ? (<this.SingleDayView />)
                          : ('') }
                    </div>
                </div>
            </div>
      );
    }
}

export default StudentClassSchedule;
