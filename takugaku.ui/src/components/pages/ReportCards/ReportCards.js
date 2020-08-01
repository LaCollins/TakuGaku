import './ReportCards.scss';
import { Redirect } from 'react-router-dom';
import React from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import studentData from '../../../helpers/data/studentData';
import assignmentData from '../../../helpers/data/assignmentData';
import ReportCardTable from '../../shared/ReportCardTable/ReportCardTable';

class ReportCards extends React.Component {
    state = {
      students: [],
      startDate: '',
      endDate: '',
      reportCards: [],
      selectedStudent: '',
      reportCardsRetrieved: false,
    }

    startDateChange = (e) => {
      e.preventDefault();
      this.setState({ startDate: e.target.value }, () => {
        if (this.state.endDate !== '' && this.state.selectedStudent !== '') {
          this.getReportCards();
          this.setState({ reportCardsRetrieved: true });
        }
      });
    }

    endDateChange = (e) => {
      e.preventDefault();
      this.setState({ endDate: e.target.value }, () => {
        if (this.state.endDate !== '' && this.state.selectedStudent !== '') {
          this.getReportCards();
          this.setState({ reportCardsRetrieved: true });
        }
      });
    }

    studentChange = (e) => {
      e.preventDefault();
      this.setState({ selectedStudent: e.target.value }, () => {
        if (this.state.endDate !== '' && this.state.startDate !== '') {
          this.getReportCards();
          this.setState({ reportCardsRetrieved: true });
        }
      });
    }

    getStudents = () => {
      const { schoolId } = this.props.school;
      studentData.getStudentBySchoolId(schoolId)
        .then((response) => {
          this.setState({ students: response });
        })
        .catch((error) => console.error(error));
    }

    getReportCards = () => {
      const { startDate, endDate, selectedStudent } = this.state;
      assignmentData.getReportCards(startDate, endDate, selectedStudent)
        .then((response) => {
          this.setState({ reportCards: response });
        })
        .catch((error) => console.error(error));
    }

    ReportCardHolder = () => (
        <div className="reportCard container">
        <h3>Grades for {moment(this.state.startDate).format('MMMM Do YYYY')} - {moment(this.state.endDate).format('MMMM Do YYYY')}</h3>
        <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Class Name</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reportCards.map((report) => <ReportCardTable
                            key={report.classTitle}
                            report={report}
                             />)}
                    </tbody>
        </Table>
        </div>
    )

    componentDidMount() {
      this.getStudents();
    }

    render() {
      const {
        students, startDate, endDate, reportCardsRetrieved,
      } = this.state;
      return (
            <div className="ReportCards">
                { !this.props.teacherLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
                  : ('')}
                <h1>Report Cards</h1>
                <div className="form-inline d-flex justify-content-around">
                <div className="col-auto ml-2">
                <label htmlFor="student" className="col-form-label">Student:</label>
                <select type="select" className="custom-select mr-sm-2" id="student" onChange={this.studentChange} required>
                  <option defaultValue="">Choose...</option>
                  {students.map((student) => (<option key={student.studentId} value={student.studentId}>{student.firstName}</option>))}
                </select>
                <label htmlFor="startDate" className="col-form-label">Start Date:</label>
                <input
                    type="date"
                    className="form-control m-2"
                    id="startDate"
                    value={startDate}
                    onChange={this.startDateChange}
                    placeholder="Select A Date"
                    required
                    >
                </input>
                <label htmlFor="endDate" className="col-form-label">End Date:</label>
                <input
                    type="date"
                    className="form-control m-2"
                    id="endDage"
                    value={endDate}
                    onChange={this.endDateChange}
                    placeholder="Select A Date"
                    required
                    >
                </input>
                </div>
                </div>
            { reportCardsRetrieved ? (<this.ReportCardHolder />)
              : ('') }
            </div>
      );
    }
}

export default ReportCards;
