import './ClassTable.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

class ClassTable extends React.Component {
    deleteClassEvent = () => {
      const { classId } = this.props.classSlot;
      this.props.deleteClass(classId);
    }

    render() {
      const {
        classSlot,
        student,
        selectedDay,
        selectedDate,
        assignments,
        studentView,
      } = this.props;

      return (
            <tr className="ClassTable">
                <td>{moment(classSlot.timeSlot, 'HH:mm:ss').format('h:mm:ss A')}</td>
                { classSlot.classTitle || studentView ? (<td>{classSlot.classTitle}</td>)
                  : (<td><Link to={{
                    pathname: `/schedule/add/${student.studentId}`,
                    state: {
                      student,
                      timeSlot: classSlot.timeSlot,
                      selectedDay,
                      selectedDate,
                      assignments,
                    },
                  }} className="btn btn-secondary scheduleButton">Add a Class</Link></td>)}
                <td><Link to={{ pathname: `/assignments/singleassignment/${classSlot.assignment.assignmentId}`, state: { assignment: classSlot.assignment, fromTable: false } }}>{classSlot.assignment.assignmentTitle}</Link></td>
                { classSlot.classTitle && !studentView ? (<td><Link to={{
                  pathname: `/schedule/edit/${classSlot.classId}`,
                  state: {
                    student,
                    timeSlot: classSlot.timeSlot,
                    selectedDay,
                    selectedDate,
                    assignments,
                    classSlot,
                  },
                }} className="btn btn-secondary edit m-0 mr-2"><i className="m-1 fas fa-edit"></i></Link>
                <Button variant="secondary" className="m-0 delete" onClick={this.deleteClassEvent}><i className="m-1 fas fa-trash-alt"></i></Button></td>)
                  : ('') }
            </tr>
      );
    }
}

export default ClassTable;
