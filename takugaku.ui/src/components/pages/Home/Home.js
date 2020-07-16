import React from 'react';
import Button from 'react-bootstrap/Button';
import './Home.scss';
import Auth from '../Auth/Auth';
import owl from './images/owl.png';
import authData from '../../../helpers/data/authData';

class Home extends React.Component {
  componentDidMount() {
    console.error(this.props.authed);
  }

  render() {
    const { authed } = this.props;

    return (
            <div className="Home container">
                <h2 className="title">Welcome to</h2>
                <h1><div className="title2">宅学</div><div className="title3">TakuGaku</div></h1>
                <img id="owl" src={owl} alt="owl"/>
                <div className="row d-flex justify-content-around buttonContainer">
                    { authed ? (<Button variant="secondary" className="teacherLogIn mainPgButton">Teacher Log In</Button>)
                      : (<Auth />) }
                    { authed ? (<Button variant="secondary" className="studentLogIn mainPgButton">Student Log In</Button>)
                      : (<Button variant="secondary" className="register mainPgButton">Register</Button>)}
                </div>
                <div className="row d-flex justify-content-center buttonContainer mt-5">
                  { authed ? (<Button variant="secondary" className="studentLogIn mainPgButton" onClick={authData.logoutUser}>Log Out</Button>)
                    : ('')}
                </div>
            </div>
    );
  }
}

export default Home;
