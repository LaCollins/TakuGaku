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

    addClassEvent = () => {
      const { classSlot } = this.props;
      this.props.setClassModalShow(classSlot.timeSlot);
    }

    editClassEvent = () => {
      const { classSlot } = this.props;
      this.props.setEditClassModalShow(classSlot.timeSlot, classSlot);
    }

    addAssignmentEvent = () => {
      this.props.setAddAssignmentModalShow(this.props.classSlot);
    }

    componentDidMount() {
      if (this.props.classSlot.assignment.assignmentTitle === '' && !this.props.studentView && this.props.classSlot.classTitle && this.props.classSlot.classTitle !== 'Lunch') {
        this.setState({ addAssignment: true });
      }
    }

    render() {
      const {
        classSlot,
        studentView,
      } = this.props;

      return (
            <tr className="ClassTable">
                <td>{moment(classSlot.timeSlot, 'HH:mm:ss').format('h:mm:ss A')}</td>
                { classSlot.classTitle || studentView ? (<td>{classSlot.classTitle}</td>)
                  : (<td><Button onClick={this.addClassEvent} variant="secondary" className="scheduleButton">Add a Class</Button></td>)}
                {classSlot.assignment.assignmentTitle === '' && !studentView && classSlot.classTitle && classSlot.classTitle !== 'Lunch' ? (<td><Button onClick={this.addAssignmentEvent} variant="secondary" className="scheduleButton">Add Assignment</Button></td>)
                  : (<td><Link to={{
                    pathname: `/assignments/singleassignment/${classSlot.assignment.assignmentId}`,
                    state: { assignment: classSlot.assignment, fromTable: false },
                  }}>{classSlot.assignment.assignmentTitle}</Link></td>)}
                { classSlot.classTitle && !studentView ? (<td><Button onClick={this.editClassEvent} variant="secondary" className="edit m-0"><i className="m-1 fas fa-edit"></i></Button>
                <Button variant="secondary" className="m-0 delete" onClick={this.deleteClassEvent}><i className="m-1 fas fa-trash-alt"></i></Button></td>)
                  : ('') }
            </tr>
      );
    }
}

export default ClassTable;
