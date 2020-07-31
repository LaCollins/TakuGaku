import './AssignmentTable.scss';
import React from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button';

class AssignmentTable extends React.Component {
    state = {
      needsGrade: false,
    }

    deleteAssignmentEvent = () => {
      const { assignmentId } = this.props.assignment;
      this.props.deleteAssignment(assignmentId);
    }

    editAssignmentEvent = () => {
      const { assignmentId } = this.props.assignment;
      this.props.setAssignmentToEdit(assignmentId);
    }

    checkGrade = () => {
      if (this.props.assignment.grade === 0) {
        this.setState({ needsGrade: true });
      }
    }

    componentDidMount() {
      this.checkGrade();
    }

    render() {
      const { needsGrade } = this.state;
      const { assignment, complete } = this.props;
      const dateAssigned = moment(assignment.dateAssigned).format('MMMM Do YYYY');
      const dateDue = moment(assignment.dateDue).format('MMMM Do YYYY');
      const dateComplete = moment(assignment.dateComplete).format('MMMM Do YYYY');
      return (
            <tr className="AssignmentTable">
            <td>{assignment.className}</td>
            <td>{assignment.assignmentTitle}</td>
            <td>{assignment.assignmentType}</td>
            <td>{dateAssigned}</td>
            { complete ? (<td>{dateComplete}</td>)
              : (<td>{dateDue}</td>)}
            { complete && !needsGrade ? (<td>{assignment.grade}</td>)
              : ('') }
            { complete && needsGrade ? (<td><Button variant="secondary" className="edit m-0 mr-2" onClick={this.editAssignmentEvent}><i className="m-1 fas fa-edit"></i></Button></td>)
              : ('') }
            { complete ? ('')
              : (<td><Button variant="secondary" className="edit m-0 mr-2" onClick={this.editAssignmentEvent}><i className="m-1 fas fa-edit"></i></Button>
              <Button variant="secondary" className="m-0 delete" onClick={this.deleteAssignmentEvent}><i className="m-1 fas fa-trash-alt"></i></Button></td>)}
        </tr>
      );
    }
}

export default AssignmentTable;
