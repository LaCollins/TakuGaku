import './StudentLogIn.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import owl from '../Home/images/owl.png';
import studentData from '../../../helpers/data/studentData';

class StudentLogIn extends React.Component {
    state = {
      userName: '',
      pin: '',
      invalidPin: false,
      invalidStudent: false,
    }

    toggleHide = () => {
      const { studentExists } = this.props;
      const container = document.getElementById('loginForm');
      const noStudents = document.getElementById('noStudents');

      if (!studentExists) {
        container.classList.add('hide');
        noStudents.classList.remove('hide');
      } else {
        container.classList.remove('hide');
        noStudents.classList.add('hide');
      }
    }

    userNameChange = (e) => {
      e.preventDefault();
      this.setState({ userName: e.target.value });
    }

      pinChange = (e) => {
        e.preventDefault();
        this.setState({ pin: e.target.value });
      }

      logInStudent = (e) => {
        e.preventDefault();
        const { schoolId } = this.props.school;
        if (this.state.pin.length !== 4) {
          this.setState({ invalidPin: true });
        } else {
          this.setState({ invalidPin: false });
          const pin = parseInt(this.state.pin, 10);
          studentData.studentValidation(schoolId, this.state.userName, pin)
            .then((response) => {
              if (response === 'No student exists') {
                this.setState({ invalidStudent: true });
              } else {
                this.setState({ invalidStudent: false });
                this.props.history.push('/student/dashboard');
                sessionStorage.setItem('student', JSON.stringify(response));
              }
            })
            .catch((error) => console.error(error, 'error from login student'));
        }
      }

      componentDidMount() {
        this.toggleHide();
      }

      render() {
        const {
          invalidStudent,
          userName,
          pin,
          invalidPin,
        } = this.state;

        return (
            <div className="StudentLogIn">
                <h1>Student Log In</h1>
                <img id="owl" src={owl} alt="owl"/>
                <div className="noStudents" id="noStudents">
                    <p>There are currently no students registered.</p>
                    <Link to="/" className="btn btn-secondary backButton">Back</Link>
                </div>
            <div className="container" id="loginForm">
                <form className="formContainer" onSubmit={this.logInStudent}>
                { invalidStudent ? (<div className="warning">Student Account Not Found! Please check your login information.</div>)
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

export default StudentLogIn;
