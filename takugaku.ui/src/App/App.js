import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';

import NavBar from '../components/shared/Navbar/NavBar';
import Home from '../components/pages/Home/Home';
import SchoolForm from '../components/pages/SchoolForm/SchoolForm';
import TeacherRegistration from '../components/pages/TeacherRegistration/TeacherRegistration';
import TeacherLogIn from '../components/pages/TeacherLogIn/TeacherLogIn';
import StudentLogIn from '../components/pages/StudentLogIn/StudentLogIn';
import StudentDashboard from '../components/pages/StudentDashboard/StudentDashboard';
import TeacherDashboard from '../components/pages/TeacherDashboard/TeacherDashboard';
import firebaseApp from '../helpers/data/connection';
import schoolData from '../helpers/data/schoolData';
import teacherData from '../helpers/data/teacherData';
import studentData from '../helpers/data/studentData';

firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
    uid: '',
    school: {},
    teacher: {},
    schoolExists: false,
    teacherExists: false,
    teacherLoggedIn: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.setState({ uid: user.uid });
        schoolData.getSchoolByUid(user.uid)
          .then((response) => {
            this.setState({ school: response });
            this.setState({ schoolExists: true });
            teacherData.getTeacherBySchoolId(response.schoolId)
              .then((teachers) => {
                if (teachers !== null) {
                  this.setState({ teacherExists: true });
                } else {
                  this.setState({ teacherExists: false });
                }
              });
            studentData.getStudentBySchoolId(response.schoolId)
              .then((students) => {
                if (students.length > 0) {
                  this.setState({ studentExists: true });
                } else {
                  this.setState({ studentExists: false });
                }
              });
          })
          .catch(() => {
            this.setState({ school: {} });
          });
      } else {
        this.setState({ authed: false });
        this.setState({ uid: '' });
        this.setState({ school: {} });
        this.setState({ schoolExists: false });
        this.setState({ teacherExists: false });
        this.setState({ studentExists: false });
        this.setState({ teacher: {}, teacherLoggedIn: false });
      }
    });
  }

  logTeacherOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('teacher');
    this.setTeacherLogout();
  }

  setSchool = (schoolInfo) => {
    this.setState({ school: schoolInfo });
  }

  setTeacher = (teacherInfo) => {
    this.setState({ teacher: teacherInfo });
    this.setTeacherLogin();
  }

  setTeacherExists = () => {
    this.setState({ teacherExists: true });
  }

  setTeacherLogin = () => {
    this.setState({ teacherLoggedIn: true });
  }

  setTeacherLogout = () => {
    this.setState({ teacherLoggedIn: false });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const {
      authed,
      uid,
      school,
      schoolExists,
      teacherExists,
      teacher,
      studentExists,
      teacherLoggedIn,
    } = this.state;

    return (
      <div className="App">
        <Router>
          { teacherLoggedIn ? (<NavBar authed={authed} logTeacherOut={this.logTeacherOut} />)
            : ('')}
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props} authed={authed} uid={uid} school={school} teacherLoggedIn={teacherLoggedIn}/>} />
            <Route path="/register/school" exact render={(props) => <SchoolForm {...props} authed={authed}
              uid={uid}
              school={school}
              schoolExists={schoolExists}
              setSchool={this.setSchool}/>}
            />
            <Route path="/register/teacher" exact render={(props) => <TeacherRegistration {...props} authed={authed}
              uid={uid}
              school={school}
              setTeacherExists={this.setTeacherExists}/>}
            />
            <Route path="/teacher/login" exact render={(props) => <TeacherLogIn {...props} authed={authed}
              uid={uid}
              school={school}
              teacherExists={teacherExists}
              teacher={teacher}
              setTeacher={this.setTeacher} />}
            />
            <Route path="/teacher/dashboard" exact render={(props) => <TeacherDashboard {...props} authed={authed}
              uid={uid}
              school={school}
              teacherLoggedIn={teacherLoggedIn}
              setTeacherLogin={this.setTeacherLogin} />} />
            <Route path="/student/login" exact render={(props) => <StudentLogIn {...props} authed={authed}
              uid={uid}
              school={school}
              studentExists={studentExists}
               />}
            />
          <Route path="/student/dashboard" exact render={(props) => <StudentDashboard {...props} authed={authed}
              uid={uid}
              school={school}/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
