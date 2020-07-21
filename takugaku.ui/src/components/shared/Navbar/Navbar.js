import './NavBar.scss';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import owl from '../../pages/Home/images/owl.png';

class NavBar extends React.Component {
  render() {
    return (
            <div className="NavBar">
             <Navbar bg="light" expand="lg" variant="light" className="fixed-top">
                 <Navbar.Brand><div className="container">
                     <div className="row"><img id="owlLogo" src={owl} alt="owl logo" />
                     <div id="title">TakuGaku - </div><div id="kanji"> 宅学</div>
                     </div></div>
                 </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/manage/students" className="nav-link">Manage Students</Link>
                        <Link to="/manage/schedules" className="nav-link">Class Schedules</Link>
                        <Link to="/manage/assignments" className="nav-link">Assignments</Link>
                        <Link to="/manage/account" className="nav-link">Manage Account</Link>
                        <Link to="/manage/report_cards" className="nav-link">Report Cards</Link>
                        <Button variant="secondary" onClick={this.props.logTeacherOut} className="logOutButton">Log Out</Button>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
    );
  }
}

export default NavBar;
