import './AssignmentsComplete.scss';
import React from 'react';
import Table from 'react-bootstrap/Table';
import AssignmentTable from '../../shared/AssignmentTable/AssignmentTable';

class AssignmentsComplete extends React.Component {
  render() {
    const { completedAssignments } = this.props;
    return (
            <div className="AssignmentsComplete">
                <h3>Completed Assignments</h3>
                <div className="container">
                    {/* <this.AddAssignmentModal show={modalShow} onHide={() => this.setState({ modalShow: false })} /> */}
                    <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Class Name</th>
                        <th>Assignment</th>
                        <th>Assignment Type</th>
                        <th>Date Assigned</th>
                        <th>Date Complete</th>
                        <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedAssignments.map((assignment) => <AssignmentTable
                            key={assignment.assignmentId}
                            assignment={assignment}
                            complete={true}
                            // deleteAssignment={this.props.deleteAssignment}
                            // setAssignmentToEdit={this.setAssignmentToEdit}
                             />)}
                    </tbody>
                    </Table>
                </div>
            </div>
    );
  }
}

export default AssignmentsComplete;
