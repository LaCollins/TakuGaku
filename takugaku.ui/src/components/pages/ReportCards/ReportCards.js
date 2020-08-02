import './ReportCards.scss';
import { Redirect } from 'react-router-dom';
import React, { useRef } from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import studentData from '../../../helpers/data/studentData';
import assignmentData from '../../../helpers/data/assignmentData';
import ReportCardTable from '../../shared/ReportCardTable/ReportCardTable';
import ComponentToPrint from './PrintComponent';

class ReportCards extends React.Component {
    state = {
      students: [],
      startDate: '',
      endDate: '',
      reportCards: [],
      selectedStudent: '',
      reportCardsRetrieved: false,
      selectedSemester: '',
      year: '',
      gpa: 0,
      selectedStudentData: [],
    }

    semesterChange = (e) => {
      e.preventDefault();
      this.setState({ selectedSemester: e.target.value }, () => {
        let startDate = '';
        let endDate = '';
        const { selectedSemester } = this.state;
        if (this.state.year !== '' && selectedSemester === 'fall') {
          const selectedYear = this.state.year.split('-')[0];
          startDate = `08-01-${selectedYear}`;
          endDate = `12-31-${selectedYear}`;
        } else if (this.state.year !== '' && selectedSemester === 'spring') {
          const selectedYear = this.state.year.split('-')[1];
          startDate = `01-01-${selectedYear}`;
          endDate = `05-31-${selectedYear}`;
        } else if (this.state.year !== '' && selectedSemester === 'summer') {
          const selectedYear = this.state.year.split('-')[1];
          startDate = `06-01-${selectedYear}`;
          endDate = `07-31-${selectedYear}`;
        } else if (this.state.year !== '' && selectedSemester === 'schoolYear') {
          const selectedYear = this.state.year.split('-');
          startDate = `08-01-${selectedYear[0]}`;
          endDate = `07-31-${selectedYear[1]}`;
        }
        this.setState({ startDate, endDate }, () => {
          if (this.state.year !== '' && this.state.selectedStudent !== '') {
            this.getReportCards();
            assignmentData.getGpaByStudentId(this.state.selectedStudent)
              .then((response) => {
                this.setState({ reportCardsRetrieved: true, gpa: response.gpa.toFixed(2) });
              })
              .catch((error) => console.error(error));
          }
        });
      });
    }

    yearChange = (e) => {
      e.preventDefault();
      this.setState({ year: e.target.value }, () => {
        let startDate = '';
        let endDate = '';
        const semester = this.state.selectedSemester;
        const { year } = this.state;
        if (semester !== '' && semester === 'fall') {
          const selectedYear = year.split('-')[0];
          startDate = `08-01-${selectedYear}`;
          endDate = `12-31-${selectedYear}`;
        } else if (semester !== '' && semester === 'spring') {
          const selectedYear = year.split('-')[1];
          startDate = `01-01-${selectedYear}`;
          endDate = `05-31-${selectedYear}`;
        } else if (semester !== '' && semester === 'summer') {
          const selectedYear = year.split('-')[1];
          startDate = `06-01-${selectedYear}`;
          endDate = `07-31-${selectedYear}`;
        } else if (semester !== '' && semester === 'schoolYear') {
          const selectedYear = year.split('-');
          startDate = `08-01-${selectedYear[0]}`;
          endDate = `07-31-${selectedYear[1]}`;
        }

        this.setState({ startDate, endDate }, () => {
          if (this.state.selectedSemester !== '' && this.state.selectedStudent !== '') {
            this.getReportCards();
            if (this.state.year !== '' && this.state.selectedStudent !== '') {
              this.getReportCards();
              assignmentData.getGpaByStudentId(this.state.selectedStudent)
                .then((response) => {
                  this.setState({ reportCardsRetrieved: true, gpa: response.gpa.toFixed(2) });
                })
                .catch((error) => console.error(error));
            }
          }
        });
      });
    }

    studentChange = (e) => {
      e.preventDefault();
      const { students } = this.state;
      for (let i = 0; i < students.length; i += 1) {
        if (students[i].studentId === parseInt(e.target.value, 10)) {
          this.setState({ selectedStudentData: students[i] });
        }
      }
      this.setState({ selectedStudent: e.target.value }, () => {
        if (this.state.selectedSemester !== '' && this.state.year !== '') {
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
      const { selectedStudent, startDate, endDate } = this.state;
      assignmentData.getReportCards(startDate, endDate, selectedStudent)
        .then((response) => {
          this.setState({ reportCards: response });
        })
        .catch((error) => console.error(error));
    }

    ReportCardHolder = () => (
        <div className="reportCard container mt-5">
        <h3>Grades for {moment(this.state.startDate).format('MMMM Do YYYY')} - {moment(this.state.endDate).format('MMMM Do YYYY')}</h3>
        <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Class Name</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Overall GPA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reportCards.map((report) => <ReportCardTable
                            key={report.classTitle}
                            report={report}
                             />)}
                      <tr>
                        <td>Total GPA:</td>
                        <td></td>
                        <td></td>
                        <td>{this.state.gpa}</td>
                      </tr>
                    </tbody>
        </Table>
        <this.Printer />
        </div>
    )

    Printer = () => {
      const componentRef = useRef();
      const student = this.state.selectedStudentData;
      const {
        selectedSemester,
        year,
        reportCards,
        gpa,
      } = this.state;

      return (
        <div>
        <ReactToPrint
          trigger={() => <button className="btn btn-secondary formButton">Print this out!</button>}
          content={() => componentRef.current}
        />
        <div style={{ display: 'none' }}>
          <ComponentToPrint ref={componentRef} student={student} semester={selectedSemester} year={year} reportCards={reportCards} gpa={gpa}/>
        </div>
        </div>
      );
    }

    componentDidMount() {
      this.getStudents();
    }

    render() {
      const {
        students, reportCardsRetrieved,
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
                <label htmlFor="semester" className="col-form-label">Semester:</label>
                <select type="select" className="custom-select mr-sm-2" id="semester" onChange={this.semesterChange} required>
                    <option defaultValue="">Choose...</option>
                    <option value="fall">Fall</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="schoolYear">Entire School Year</option>
                </select>
                <label htmlFor="year" className="col-form-label">School Year:</label>
                <select type="select" className="custom-select mr-sm-2" id="year" onChange={this.yearChange} required>
                    <option defaultValue="">Choose...</option>
                    <option value="2020-2021">2020-2021</option>
                    <option value="2021-2022">2021-2022</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2022-2023">2023-2024</option>
                    <option value="2022-2023">2024-2025</option>
                    <option value="2022-2023">2025-2026</option>
                    <option value="2022-2023">2026-2027</option>
                    <option value="2022-2023">2027-2028</option>
                </select>
                </div>
                </div>
            { reportCardsRetrieved ? (<this.ReportCardHolder />)
              : ('') }
            </div>
      );
    }
}

export default ReportCards;
