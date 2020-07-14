import React from 'react';
import Button from 'react-bootstrap/Button';
import './Home.scss';
import owl from './images/owl.png';

class Home extends React.Component {
  render() {
    return (
            <div className="Home container">
                <h2 className="title">Welcome to</h2>
                <h1><div className="title2">宅学</div><div className="title3">TakuGaku</div></h1>
                <img id="owl" src={owl} alt="owl"/>
                <div className="row d-flex justify-content-around buttonContainer">
                    <Button variant="secondary" className="signIn mainPgButton">Sign In</Button>
                    <Button variant="secondary" className="register mainPgButton">Register</Button>
                </div>
            </div>
    );
  }
}

export default Home;
