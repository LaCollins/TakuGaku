import './ManageStudents.scss';
import React from 'react';
import Table from 'react-bootstrap/Table';
import StudentTable from '../../shared/StudentTable/StudentTable';
import studentData from '../../../helpers/data/studentData';

class ManageStudents extends React.Component {
    state = {
      students: {},
    }

    getStudents = () => {
      studentData.getStudentBySchoolId(this.props.school.schoolId)
        .then((students) => {
          if (students.length > 0) {
            this.setState({ students });
          } else {
            this.setState({ students: {} });
          }
        });
    }

    componentDidMount() {
      this.getStudents();
    }

    render() {
      const { students } = this.state;

      return (
            <div className="ManageStudents">
                <h1>Manage Students</h1>
                <div className="container">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Birth Date</th>
                        <th>School Year</th>
                        <th>Schedule</th>
                        <th>Assignments</th>
                        <th>GPA</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0
                          ? students.map((student) => <StudentTable key={student.studentId} student={student} />)
                          : ('No students exist')}
                    </tbody>
                    </Table>
                </div>
            </div>
      );
    }
}

export default ManageStudents;
