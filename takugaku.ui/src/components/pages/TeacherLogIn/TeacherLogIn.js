import './TeacherLogin.scss';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import owl from '../Home/images/owl.png';
// import teacherData from '../../../helpers/data/teacherData';

class TeacherLogIn extends React.Component {
    state = {
      userName: '',
      pin: '',
      invalidPin: false,
    }

    userNameChange = (e) => {
      e.preventDefault();
      this.setState({ userName: e.target.value });
    }

      pinChange = (e) => {
        e.preventDefault();
        this.setState({ pin: e.target.value });
      }

      render() {
        const { teacherExists } = this.props;
        const { userName, pin, invalidPin } = this.state;

        return (
            <div className="TeacherLogIn">
                { !teacherExists ? (<Redirect push to={{ pathname: '/register/teacher' }} />)
                  : ('')}
                <h1>Teacher Log In</h1>
                <img id="owl" src={owl} alt="owl"/>
                <div className="container">
                <form className="formContainer" onSubmit={this.logInTeacher}>
                <div className="form-inline d-flex justify-content-center">
                    <div className="form-group row">
                    <label htmlFor="userName" className="col-form-label">User Name:</label>
                    <input
                    type="text"
                    className="form-control m-2"
                    id="userName"
                    placeholder="Enter User Name"
                    value={userName}
                    onChange={this.userNameChange}
                    required
                    >
                    </input>
                    </div>
                </div>
                <div className="form-inline d-flex justify-content-center">
                    <div className="form-group row">
                    <label htmlFor="PIN" className="col-form-label">Please Enter a 4-Digit PIN:</label>
                    <input
                    type="number"
                    className="form-control m-2"
                    id="PIN"
                    value={pin}
                    onChange={this.pinChange}
                    required
                    >
                    </input>
                    </div>
                </div>
                { invalidPin ? (<div className="warning">Please enter a valid PIN!</div>)
                  : ('')}
                <div className="buttonContainer">
                    <Button variant="secondary" className="formButton" type="submit">Log In</Button>
                </div>
                </form>
            </div>
        </div>
        );
      }
}

export default TeacherLogIn;
