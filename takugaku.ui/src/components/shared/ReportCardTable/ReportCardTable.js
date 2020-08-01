import './ReportCardTable.scss';
import React from 'react';

class ReportCardTable extends React.Component {
  state = {
    grade: '',
  }

  setLetterGrade = () => {
    const { grade } = this.props.report;
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
    } else if (grade < 1.0) {
      letterGrade = 'F';
    }

    this.setState({ grade: letterGrade });
  }

  componentDidMount() {
    this.setLetterGrade();
  }

  render() {
    const { report } = this.props;
    const { grade } = this.state;

    return (
              <tr className="ReportCardTable">
              <td>{report.classTitle}</td>
              <td>{report.subjectType}</td>
              <td>{grade}</td>
              </tr>
    );
  }
}

export default ReportCardTable;
