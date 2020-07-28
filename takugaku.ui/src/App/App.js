import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';

import NavBar from '../components/shared/NavBar/NavBar';
import Home from '../components/pages/Home/Home';
import SchoolForm from '../components/pages/SchoolForm/SchoolForm';
import TeacherRegistration from '../components/pages/TeacherRegistration/TeacherRegistration';
import TeacherLogIn from '../components/pages/TeacherLogIn/TeacherLogIn';
import StudentLogIn from '../components/pages/StudentLogIn/StudentLogIn';
import StudentForm from '../components/pages/StudentForm/StudentForm';
import StudentCalendar from '../components/shared/StudentCalendar/StudentCalendar';
import StudentDashboard from '../components/pages/StudentDashboard/StudentDashboard';
import TeacherDashboard from '../components/pages/TeacherDashboard/TeacherDashboard';
import ManageStudents from '../components/pages/ManageStudents/ManageStudents';
import ScheduleSingleDay from '../components/pages/ScheduleSingleDay/ScheduleSingleDay';
import ClassForm from '../components/pages/ClassForm/ClassForm';
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
    this.toggleNavbar();
  }

  toggleNavbar = () => {
    const navbar = document.getElementById('navbar');
    const { teacherLoggedIn } = this.state;
    if (teacherLoggedIn) {
      navbar.classList.remove('hide');
    } else {
      navbar.classList.add('hide');
    }
  }

  logTeacherOut = (e) => {
    e.preventDefault();
    const navbar = document.getElementById('navbar');
    sessionStorage.removeItem('teacher');
    this.setTeacherLogout();
    navbar.classList.add('hide');
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
    const navbar = document.getElementById('navbar');
    this.setState({ teacherLoggedIn: true });
    navbar.classList.remove('hide');
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
          <NavBar authed={authed} logTeacherOut={this.logTeacherOut} />
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props} authed={authed} uid={uid} school={school} teacherLoggedIn={teacherLoggedIn}/>} />
            <Route path="/register/school" exact render={(props) => <SchoolForm {...props} authed={authed}
              uid={uid}
              school={school}
              schoolExists={schoolExists}
              setSchool={this.setSchool}/>}
            />
            <Route path="/register/teacher" exact render={(props) => <TeacherRegistration {...props} authed={authed}
              school={school}
              setTeacherExists={this.setTeacherExists}/>}
            />
            <Route path="/teacher/login" exact render={(props) => <TeacherLogIn {...props} authed={authed}
              school={school}
              teacherExists={teacherExists}
              teacher={teacher}
              setTeacher={this.setTeacher}
              toggleNavbar={this.toggleNavbar} />}
            />
            <Route path="/teacher/dashboard" exact render={(props) => <TeacherDashboard {...props} authed={authed}
              school={school}
              teacherLoggedIn={teacherLoggedIn}
              setTeacherLogin={this.setTeacherLogin} />} />
            <Route path="/student/login" exact render={(props) => <StudentLogIn {...props} authed={authed}
              school={school}
              studentExists={studentExists}
               />}
            />
            <Route path="/student/dashboard" exact render={(props) => <StudentDashboard {...props} authed={authed}
              school={school}/>} />
            <Route path="/manage/students" exact render={(props) => <ManageStudents {...props} authed={authed}
              school={school}
              teacherLoggedIn={teacherLoggedIn}
              studentExists={studentExists}
              getStudents={this.getStudents}
               />}
            />
            <Route path="/manage/addstudent" exact render={(props) => <StudentForm {...props} authed={authed}
              school={school}
               />}
            />
            <Route path="/manage/edit/:studentId" exact render={(props) => <StudentForm {...props} authed={authed}
              school={school}
               />}
            />
            <Route path="/manage/schedules" exact render={(props) => <StudentCalendar {...props} authed={authed}
            teacherLoggedIn={teacherLoggedIn}
            school={school} />}/>
            <Route path="/manage/schedules/:studentId" exact render={(props) => <StudentCalendar {...props} authed={authed}
            teacherLoggedIn={teacherLoggedIn}
            school={school} />}/>
            <Route path="/schedule/:studentId" exact render={(props) => <ScheduleSingleDay {...props} authed={authed}
            teacherLoggedIn={teacherLoggedIn}
            school={school} />}/>
            <Route path="/schedule/add/:studentId" exact render={(props) => <ClassForm {...props} authed={authed}
            teacherLoggedIn={teacherLoggedIn}
            school={school} />}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
