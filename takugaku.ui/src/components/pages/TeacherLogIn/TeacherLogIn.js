import './TeacherLogin.scss';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import owl from '../Home/images/owl.png';
import teacherData from '../../../helpers/data/teacherData';

class TeacherLogIn extends React.Component {
    state = {
      userName: '',
      pin: '',
      invalidPin: false,
      invalidTeacher: false,
    }

    userNameChange = (e) => {
      e.preventDefault();
      this.setState({ userName: e.target.value });
    }

    pinChange = (e) => {
      e.preventDefault();
      this.setState({ pin: e.target.value });
    }

    logInTeacher = (e) => {
      e.preventDefault();
      const { schoolId } = this.props.school;
      if (this.state.pin.length !== 4) {
        this.setState({ invalidPin: true });
      } else {
        this.setState({ invalidPin: false });
        const pin = parseInt(this.state.pin, 10);
        teacherData.teacherValidation(schoolId, this.state.userName, pin)
          .then((response) => {
            if (response === 'No teacher exists') {
              this.setState({ invalidTeacher: true });
            } else {
              this.setState({ invalidTeacher: false });
              this.props.history.push('/teacher/dashboard');
              sessionStorage.setItem('teacher', JSON.stringify(response));
              this.props.setTeacher(response);
              this.props.toggleNavbar();
            }
          })
          .catch((error) => console.error(error, 'error from login teacher'));
      }
    }

    render() {
      const { teacherExists } = this.props;
      const {
        userName,
        pin,
        invalidPin,
        invalidTeacher,
      } = this.state;

      return (
        <div className="TeacherLogIn">
            { !teacherExists ? (<Redirect push to={{ pathname: '/register/teacher' }} />)
              : ('')}
            <h1>Teacher Log In</h1>
            <img id="owl" src={owl} alt="owl"/>
            <div className="container">
            <form className="formContainer" onSubmit={this.logInTeacher}>
            { invalidTeacher ? (<div className="warning">Teacher Account Not Found! Please check your login information.</div>)
              : ('')}
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
