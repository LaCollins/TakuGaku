import './StudentTable.scss';
import React from 'react';

class StudentTable extends React.Component {
  render() {
    const { student } = this.props;
    const birthday = student.birthday.split('T');

    return (
            <tr className="StudentTable">
                <td>{student.firstName} {student.lastName}</td>
                <td>{birthday[0]}</td>
                <td>{student.gradeYear}</td>
                <td>Schedule</td>
                <td>Assignments</td>
                <td>0</td>
                <td>del/edit</td>
            </tr>
    );
  }
}

export default StudentTable;
