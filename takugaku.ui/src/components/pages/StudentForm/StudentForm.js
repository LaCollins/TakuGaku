import './StudentForm.scss';
import React from 'react';
import Button from 'react-bootstrap/Button';
import studentData from '../../../helpers/data/studentData';

class StudentForm extends React.Component {
    state = {
      firstName: '',
      lastName: '',
      birthday: '',
      gradeYear: 0,
      userName: '',
      pin: 0,
      invalidPin: false,
      invalidStudent: false,
    }

    componentDidMount() {
      const { studentId } = this.props.match.params;
      if (studentId) {
        studentData.getStudentById(studentId)
          .then((student) => console.error(student))
          .catch((error) => console.error(error, 'err from check editMode'));
      }
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

      birthdayChange = (e) => {
        e.preventDefault();
        this.setState({ birthday: e.target.value });
      }

      gradeYearChange = (e) => {
        e.preventDefault();
        this.setState({ gradeYear: e.target.value });
      }

      pinChange = (e) => {
        e.preventDefault();
        this.setState({ pin: e.target.value });
      }

      saveStudentEvent = (e) => {
        e.preventDefault();
        const gradeYear = parseInt(this.state.gradeYear, 10);
        if (this.state.pin.length !== 4) {
          this.setState({ invalidPin: true });
        } else {
          this.setState({ invalidPin: false });
          const pin = parseInt(this.state.pin, 10);

          const newStudent = {
            schoolId: this.props.school.schoolId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthday: this.state.birthday,
            gradeYear,
            userName: this.state.userName,
            pin,
          };
          studentData.registerStudent(newStudent)
            .then((response) => {
              if (response.data === 'That username already exists, student not added.') {
                this.setState({ invalidStudent: true });
              } else {
                this.props.history.push('/manage/students');
                this.setState({ invalidStudent: false });
              }
            })
            .catch((error) => console.error('err from save profile', error));
        }
      }

      render() {
        const {
          firstName,
          lastName,
          birthday,
          userName,
          pin,
          invalidPin,
          invalidStudent,
        } = this.state;

        return (
            <div className="StudentForm">
                <h1>Register A Student</h1>
                <div className="container">
                { invalidStudent ? (<div className="warning">User Name already exists. Please choose another.</div>)
                  : ('')}
                <form className="formContainer" onSubmit={this.saveStudentEvent}>
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
                    <div className="form-group row justify-content-center">
                    <label htmlFor="birthday" className="col-form-label">Birthday:</label>
                    <input
                        type="date"
                        className="form-control m-2"
                        id="birthday"
                        value={birthday}
                        onChange={this.birthdayChange}
                        placeholder="Enter First Name"
                        required
                        >
                    </input>
                </div>
                </div>
                <div className="form-inline d-flex justify-content-center">
                <div className="col-auto my-1">
                <label htmlFor="gradeYear" className="col-form-label">Grade Year:</label>
                <select type="select" className="custom-select mr-sm-2" id="gradeYear" onChange={this.gradeYearChange} required>
                    <option defaultValue>Choose...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
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
                <Button variant="secondary" className="formButton" type="submit">Register Student</Button>
                </div>
                </form>
                </div>
            </div>
        );
      }
}

export default StudentForm;
