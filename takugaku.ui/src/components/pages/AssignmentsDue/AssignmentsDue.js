import './AssignmentsDue.scss';
import React from 'react';
import Table from 'react-bootstrap/Table';
import AssignmentTable from '../../shared/AssignmentTable/AssignmentTable';

class AssignmentsDue extends React.Component {
  render() {
    const { dueAssignments } = this.props;

    return (
            <div className="AssignmentsDue">
                <h3>Due Assignments</h3>
                <div className="container">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Class Name</th>
                        <th>Assignment</th>
                        <th>Assignment Type</th>
                        <th>Date Assigned</th>
                        <th>Date Due</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dueAssignments.map((assignment) => <AssignmentTable key={assignment.assignmentId} assignment={assignment} deleteAssignment={this.props.deleteAssignment} />)}
                    </tbody>
                    </Table>
                </div>
            </div>
    );
  }
}

export default AssignmentsDue;
