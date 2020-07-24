import './StudentTable.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import assignmentData from '../../../helpers/data/assignmentData';

class StudentTable extends React.Component {
    state = {
      gpa: {},
    }

    getGPA = () => {
      const { studentId } = this.props.student;
      assignmentData.getGpaByStudentId(studentId)
        .then((response) => {
          this.setState({ gpa: response });
        })
        .catch((error) => console.error(error, 'error from get GPA'));
    }

    deleteStudentEvent = () => {
      const { student } = this.props;
      this.props.deleteStudent(student.studentId);
    }

    componentDidMount() {
      this.getGPA();
    }

    render() {
      const { student } = this.props;
      const birthday = student.birthday.split('T');
      const { gpa } = this.state;

      return (
            <tr className="StudentTable">
                <td>{student.firstName} {student.lastName}</td>
                <td>{birthday[0]}</td>
                <td>{student.gradeYear}</td>
                <td><Link to={`/manage/schedules/${student.studentId}`}>Schedule</Link></td>
                <td><Link to={`/assignments/${student.studentId}`}>Assignments</Link></td>
                <td>{gpa.gpa}</td>
                <td><Link to={`/manage/edit/${student.studentId}`} className="btn btn-secondary m-0"><i className="m-1 fas fa-edit"></i></Link> <Button variant="secondary" className="m-0" onClick={this.deleteStudentEvent}><i className="m-1 fas fa-trash-alt"></i></Button></td>
            </tr>
      );
    }
}

export default StudentTable;
