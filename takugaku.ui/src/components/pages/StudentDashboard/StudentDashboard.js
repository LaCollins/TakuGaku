import './StudentDashboard.scss';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class StudentDashboard extends React.Component {
  state = {
    student: {},
  }

  getToken = () => {
    const token = JSON.parse(sessionStorage.getItem('student'));
    this.setState({ student: token });
    this.props.setStudentLogin();
  }

  componentDidMount() {
    this.getToken();
  }

  render() {
    return (
            <div className="StudentDashboard">
            { !this.props.studentLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
              : ('')}
                <h1>Student Dashboard</h1>
                <div className="buttonContainer container">
                  <div className="row d-flex justify-content-center">
                    <Link to="/viewschedule" className="btn btn-secondary studentButton">Class Schedule</Link>
                    <Link to="/assignments" className="btn btn-secondary studentButton">Assignments</Link>
                  </div>
                </div>
            </div>
    );
  }
}

export default StudentDashboard;
