import './TeacherRegistration.scss';
import React from 'react';
import Button from 'react-bootstrap/Button';
import owl from '../Home/images/owl.png';
import teacherData from '../../../helpers/data/teacherData';

class TeacherRegistration extends React.Component {
    state = {
      firstName: '',
      lastName: '',
      userName: '',
      pin: 0,
      invalidPin: false,
    }

    firstNameChange = (e) => {
      e.preventDefault();
      this.setState({ firstName: e.target.value });
    }

    lastNameChange = (e) => {
      e.preventDefault();
      this.setState({ lastName: e.target.value });
    }

    userNameChange = (e) => {
      e.preventDefault();
      this.setState({ userName: e.target.value });
    }

    pinChange = (e) => {
      e.preventDefault();
      this.setState({ pin: e.target.value });
    }

    saveTeacherEvent = (e) => {
      e.preventDefault();
      if (this.state.pin.length !== 4) {
        this.setState({ invalidPin: true });
      } else {
        this.setState({ invalidPin: false });
        const pin = parseInt(this.state.pin, 10);

        const newTeacher = {
          schoolId: this.props.school.schoolId,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userName: this.state.userName,
          pin,
        };
        teacherData.registerTeacher(newTeacher)
          .then((response) => {
            this.props.setTeacher(response.data);
            this.props.setTeacherExists();
            this.props.history.push('/teacher/login');
          })
          .catch((error) => console.error('err from save profile', error));
      }
    }

    render() {
      const {
        firstName,
        lastName,
        userName,
        pin,
        invalidPin,
      } = this.state;

      return (
            <div className="TeacherRegistration">
                <h1>Register A Teacher</h1>
                <img id="owl" src={owl} alt="owl"/>
                <div className="container">
                <h2>Welcome to TakuGaku!</h2>
                <p>I see you are a first time user! Please register a teacher to start.</p>
                <form className="formContainer" onSubmit={this.saveTeacherEvent}>
                <div className="form-inline d-flex justify-content-center">
                  <div className="form-group row justify-content-center">
                    <label htmlFor="firstName" className="col-form-label">First Name:</label>
                    <input
                      type="text"
                      className="form-control m-2"
                      id="firstName"
                      value={firstName}
                      onChange={this.firstNameChange}
                      placeholder="Enter First Name"
                      required
                      >
                    </input>
                </div>
                </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row">
                  <label htmlFor="lastName" className="col-form-label">Last Name:</label>
                  <input
                  type="text"
                  className="form-control m-2"
                  id="lastName"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={this.lastNameChange}
                  required
                  >
                  </input>
                </div>
              </div>
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
                <Button variant="secondary" className="formButton" type="submit">Register Teacher</Button>
              </div>
              </form>
                </div>
            </div>
      );
    }
}

export default TeacherRegistration;
