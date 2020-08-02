import './TeacherDashboard.scss';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class TeacherDashboard extends React.Component {
  state = {
    teacher: {},
  }

  getToken = () => {
    const token = JSON.parse(sessionStorage.getItem('teacher'));
    this.setState({ teacher: token });
    this.props.setTeacherLogin();
  }

  componentDidMount() {
    this.getToken();
  }

  render() {
    return (
            <div className="TeacherDashboard">
            { !this.props.teacherLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
              : ('')}
                <h1>Teacher Dashboard</h1>
                <div className="buttonContainer container">
                  <div className="row d-flex justify-content-center">
                    <Link to="/manage/students" className="btn btn-secondary teacherButton">Manage Students</Link>
                    <Link to="/manage/schedules" className="btn btn-secondary teacherButton">Class Schedules</Link>
                    <Link to="/manage/assignments" className="btn btn-secondary teacherButton">Assignments</Link>
                    <Link to="/manage/account" className="btn btn-secondary teacherButton">Manage Account</Link>
                    <Link to="/manage/report_cards" className="teacherButton btn btn-secondary">Report Cards</Link>
                  </div>
                </div>
            </div>
    );
  }
}

export default TeacherDashboard;
