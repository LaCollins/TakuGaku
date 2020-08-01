import React from 'react';
import './ReportCards.scss';
import ReportCardTable from '../../shared/ReportCardTable/ReportCardTable';

class ComponentToPrint extends React.Component {
  render() {
    const { year, student, gpa } = this.props;
    const semester = this.props.semester[0].toUpperCase() + this.props.semester.slice(1);
    return (
        <div className="PrintComponent d-flex justify-content-center">
            <div className="card hide">
            <div className="card-header">{semester} {year} Report Card for {student.firstName} {student.lastName} - Grade {student.gradeYear}</div>
            <div clasName="card-body">
                <div className="card-text">
                <table border="1" rules="rows">
                <thead>
                    <tr>
                    <th>Class Name</th>
                    <th>Subject</th>
                    <th>Grade</th>
                    <th>Overall GPA</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.reportCards.map((report) => <ReportCardTable
                        key={report.classTitle}
                        report={report}
                            />)}
                    <tr>
                    <td>Total GPA:</td>
                    <td></td>
                    <td></td>
                    <td>{gpa}</td>
                    </tr>
                </tbody>
             </table>
                </div>
            </div>
            </div>
        </div>
    );
  }
}

export default ComponentToPrint;
