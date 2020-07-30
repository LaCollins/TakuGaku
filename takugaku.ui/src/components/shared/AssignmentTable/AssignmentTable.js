import './AssignmentTable.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Button from 'react-bootstrap/Button';

class AssignmentTable extends React.Component {
    deleteAssignmentEvent = () => {
      const { assignmentId } = this.props.assignment;
      this.props.deleteAssignment(assignmentId);
    }

    render() {
      const { assignment } = this.props;
      const dateAssigned = moment(assignment.dateAssigned).format('MMMM Do YYYY');
      const dateDue = moment(assignment.dateDue).format('MMMM Do YYYY');
      return (
            <tr className="AssignmentTable">
            <td>{assignment.className}</td>
            <td>{assignment.assignmentTitle}</td>
            <td>{assignment.assignmentType}</td>
            <td>{dateAssigned}</td>
            <td>{dateDue}</td>
            <td><Link to={''} className="btn btn-secondary edit m-0 mr-2"><i className="m-1 fas fa-edit"></i></Link>
            <Button variant="secondary" className="m-0 delete" onClick={this.deleteAssignmentEvent}><i className="m-1 fas fa-trash-alt"></i></Button></td>
        </tr>
      );
    }
}

export default AssignmentTable;
