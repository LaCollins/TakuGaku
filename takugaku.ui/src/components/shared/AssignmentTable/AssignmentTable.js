import './AssignmentTable.scss';
import React from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class AssignmentTable extends React.Component {
   state = {
     letterGrade: '',
   }

    deleteAssignmentEvent = () => {
      const { assignmentId } = this.props.assignment;
      this.props.deleteAssignment(assignmentId);
    }

    editAssignmentEvent = () => {
      const { assignmentId } = this.props.assignment;
      this.props.setAssignmentToEdit(assignmentId);
    }

    addGrade = () => {
      const { assignmentId } = this.props.assignment;
      this.props.setGradeModalShow(assignmentId);
    }

    setLetterGrade = () => {
      const { grade } = this.props.assignment;
      let letterGrade = '';
      if (grade >= 3.9) {
        letterGrade = 'A+';
      } else if (grade >= 3.7 && grade < 3.9) {
        letterGrade = 'A';
      } else if (grade >= 3.5 && grade < 3.7) {
        letterGrade = 'A-';
      } else if (grade >= 3.3 && grade < 3.5) {
        letterGrade = 'B+';
      } else if (grade >= 3.0 && grade < 3.3) {
        letterGrade = 'B';
      } else if (grade >= 2.7 && grade < 3.0) {
        letterGrade = 'B-';
      } else if (grade >= 2.3 && grade < 2.7) {
        letterGrade = 'C+';
      } else if (grade >= 2.0 && grade < 2.3) {
        letterGrade = 'C';
      } else if (grade >= 1.7 && grade < 2.0) {
        letterGrade = 'C-';
      } else if (grade >= 1.3 && grade < 1.7) {
        letterGrade = 'D+';
      } else if (grade >= 1.0 && grade < 1.3) {
        letterGrade = 'D';
      } else if (grade < 1.0 && grade >= 0) {
        letterGrade = 'F';
      } else if (grade < 0) {
        letterGrade = 'N/A';
      }

      return (letterGrade);
    }

    render() {
      const { assignment, complete, studentView } = this.props;
      const dateAssigned = moment(assignment.dateAssigned).format('MMMM Do YYYY');
      const dateDue = moment(assignment.dateDue).format('MMMM Do YYYY');
      const dateComplete = moment(assignment.dateComplete).format('MMMM Do YYYY');
      const grade = this.setLetterGrade();

      return (
            <tr className="AssignmentTable">
            <td>{assignment.className}</td>
            { !complete ? (<td><Link to={{
              pathname: `/assignments/singleassignment/${assignment.assignmentId}`,
              state: { assignment, fromTable: true },
            }}>{assignment.assignmentTitle}</Link></td>)
              : (<td>{assignment.assignmentTitle}</td>)}
            <td>{assignment.assignmentType}</td>
            <td>{dateAssigned}</td>
            { complete ? (<td>{dateComplete}</td>)
              : (<td>{dateDue}</td>)}
            { complete && !studentView ? (<td>{grade} <Button variant="secondary" className="edit m-0 mr-0 ml-2" onClick={this.addGrade}><i className="m-1 fas fa-edit"></i></Button></td>)
              : ('') }
            { complete && studentView ? (<td>{grade}</td>)
              : ('')}
            { !complete && !studentView ? (<td><Button variant="secondary" className="edit m-0 mr-2" onClick={this.editAssignmentEvent}><i className="m-1 fas fa-edit"></i></Button>
              <Button variant="secondary" className="m-0 delete" onClick={this.deleteAssignmentEvent}><i className="m-1 fas fa-trash-alt"></i></Button></td>)
              : ('') }
        </tr>
      );
    }
}

export default AssignmentTable;
