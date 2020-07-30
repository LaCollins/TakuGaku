import './AssignmentsDue.scss';
import React from 'react';
import Table from 'react-bootstrap/Table';

class AssignmentsDue extends React.Component {
  render() {
    return (
            <div className="AssignmentsDue">
                <h3>Due Assignments</h3>
                {/* <h4>{student.firstName}'s Class Schedule for {selectedDay.toUpperCase()}</h4>
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
                    </Table> */}
                {/* </div> */}
            </div>
    );
  }
}

export default AssignmentsDue;
