import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Home.scss';
import Auth from '../Auth/Auth';
import owl from './images/owl.png';
import authData from '../../../helpers/data/authData';

class Home extends React.Component {
  logOutEvent = (e) => {
    e.preventDefault();
    authData.logoutUser();
    sessionStorage.removeItem('teacher');
    sessionStorage.removeItem('student');
  }

  render() {
    const { authed } = this.props;

    return (
            <div className="Home container">
                <h2 className="title">Welcome to</h2>
                <h1><div className="title2">宅学</div><div className="title3">TakuGaku</div></h1>
                <img id="owl" src={owl} alt="owl"/>
                <div className="row d-flex justify-content-around buttonContainer">
                    { authed ? (<Link to="/teacher/login" className="btn btn-secondary teacherLogIn mainPgButton">Teacher Log In</Link>)
                      : (<Auth />) }
                    { authed ? (<Link to="/student/login" className="btn btn-secondary studentLogIn mainPgButton">Student Log In</Link>)
                      : (<Link to="/register/school" className="btn btn-secondary register mainPgButton">Register</Link>)}
                </div>
                <div className="row d-flex justify-content-center buttonContainer mt-5">
                  { authed ? (<Button variant="secondary" className="studentLogIn mainPgButton" onClick={this.logOutEvent}>Log Out</Button>)
                    : ('')}
                </div>
            </div>
    );
  }
}

export default Home;
