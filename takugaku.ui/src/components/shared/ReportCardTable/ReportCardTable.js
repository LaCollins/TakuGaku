import './ReportCardTable.scss';
import React from 'react';

class ReportCardTable extends React.Component {
  render() {
    const { report } = this.props;

    return (
              <tr className="ReportCardTable">
              <td>{report.classTitle}</td>
              <td>{report.subjectType}</td>
              <td>{report.grade.toFixed(2)}</td>
              </tr>
    );
  }
}

export default ReportCardTable;
