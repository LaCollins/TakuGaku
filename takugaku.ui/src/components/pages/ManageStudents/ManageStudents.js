import './ManageStudents.scss';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link, Redirect } from 'react-router-dom';
import StudentTable from '../../shared/StudentTable/StudentTable';
import studentData from '../../../helpers/data/studentData';

class ManageStudents extends React.Component {
//   state = {
//     students: {},
//   }

  //     getStudents = () => {
  //       studentData.getStudentBySchoolId(this.props.school.schoolId)
  //         .then((students) => {
  //           if (students.length > 0) {
  //             this.setState({ students });
  //           } else {
  //             this.setState({ students: {} });
  //           }
  //         });
  //     }

    deleteStudent = (studentId) => {
      studentData.deleteStudent(studentId);
      this.props.getStudents();
    }

    componentDidMount() {
      this.props.getStudents();
    }

    render() {
      const { students } = this.props;

      return (
            <div className="ManageStudents">
                { !this.props.teacherLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
                  : ('')}
                <h1>Manage Students</h1>
                <div className="container">
                <Link to="/manage/addstudent" className="btn btn-secondary m-4">Add a Student</Link>
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
                          ? students.map((student) => <StudentTable key={student.studentId} student={student} deleteStudent={this.deleteStudent}/>)
                          : ('No students exist')}
                    </tbody>
                    </Table>
                </div>
            </div>
      );
    }
}

export default ManageStudents;
