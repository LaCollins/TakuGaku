import './TeacherDashboard.scss';
import React from 'react';
import { Redirect } from 'react-router-dom';
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
                    <Button variant="secondary" className="teacherButton">Manage Students</Button>
                    <Button variant="secondary" className="teacherButton">Class Schedules</Button>
                    <Button variant="secondary" className="teacherButton">Assignments</Button>
                    <Button variant="secondary" className="teacherButton">Manage Account</Button>
                    <Button variant="secondary" className="teacherButton">Report Cards</Button>
                  </div>
                </div>
            </div>
    );
  }
}

export default TeacherDashboard;
