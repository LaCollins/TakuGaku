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
      invalidTeacher: false,
      editMode: false,
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

    saveTeacherEvent = () => {
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
            if (response.data === 'That username already exists, teacher not added.') {
              this.setState({ invalidTeacher: true });
            } else {
              sessionStorage.setItem('teacher', JSON.stringify(response.data));
              this.props.setTeacherExists();
              this.props.history.push('/teacher/login');
              this.setState({ invalidTeacher: false });
            }
          })
          .catch((error) => console.error('err from save profile', error));
      }
    }

    updateTeacherEvent = () => {
      const { teacherId } = this.props.teacher;
      if (this.state.pin.length !== 4) {
        this.setState({ invalidPin: true });
      } else {
        this.setState({ invalidPin: false });
        const pin = parseInt(this.state.pin, 10);

        const updatedTeacher = {
          schoolId: this.props.school.schoolId,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userName: this.state.userName,
          pin,
        };
        teacherData.updateTeacher(teacherId, updatedTeacher)
          .then((response) => {
            if (response.data === 'That username already exists, teacher not added.') {
              this.setState({ invalidTeacher: true });
            } else {
              sessionStorage.setItem('teacher', JSON.stringify(response.data));
              this.props.setTeacherExists();
              this.props.setTeacherModalHide();
              this.props.setSuccessfullUpdate();
              this.setState({ invalidTeacher: false });
            }
          })
          .catch((error) => console.error('err from save profile', error));
      }
    }

    checkEditOrCreate = (e) => {
      e.preventDefault();
      if (this.state.editMode) {
        this.updateTeacherEvent();
      } else {
        this.saveTeacherEvent();
      }
    }

    componentDidMount() {
      if (this.props.editMode) {
        this.setState({ editMode: true });
        this.setState({ firstName: this.props.teacher.firstName });
        this.setState({ lastName: this.props.teacher.lastName });
        this.setState({ userName: this.props.teacher.userName });
        this.setState({ pin: this.props.teacher.pin });
      }
    }

    render() {
      const {
        firstName,
        lastName,
        userName,
        pin,
        invalidPin,
        invalidTeacher,
        editMode,
      } = this.state;

      return (
            <div className="TeacherRegistration">
              { editMode ? ('')
                : (<div><h1>Register A Teacher</h1>
                <img id="owl" src={owl} alt="owl"/>
                </div>)}
                <div className="container">
              { editMode ? ('')
                : (<div><h2>Welcome to TakuGaku!</h2>
                <p>I see you are a first time user! Please register a teacher to start.</p></div>)}
                { invalidTeacher ? (<div className="warning">User Name already exists. Please choose another.</div>)
                  : ('')}
                <form className="formContainer" onSubmit={this.checkEditOrCreate}>
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
                { editMode ? (<div className="buttonContainer d-flex justify-content-between">
                              <Button variant="secondary" className="formButton" onClick={this.props.setTeacherModalHide}>Close</Button>
                              <Button variant="secondary" className="formButton" type="submit">Save Changes</Button>
                              </div>)
                  : (<div className="buttonContainer">
                    <Button variant="secondary" className="formButton" type="submit">Register Teacher</Button>
                    </div>)}
              </form>
                </div>
            </div>
      );
    }
}

export default TeacherRegistration;
