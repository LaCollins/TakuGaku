import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import './SchoolForm.scss';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import owl from '../Home/images/owl.png';
import authData from '../../../helpers/data/authData';
import schoolData from '../../../helpers/data/schoolData';

class SchoolForm extends React.Component {
  state = {
    schoolName: '',
    email: '',
  }

  componentDidMount() {
    if (this.props.authed === false) {
      authData.loginUser();
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ email: user.email });
      } else {
        this.setState({ email: '' });
      }
    });
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ schoolName: e.target.value });
  }

  emailChange = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  saveSchoolEvent = (e) => {
    e.preventDefault();
    const newSchool = {
      schoolName: this.state.schoolName,
      uid: this.props.uid,
      email: this.state.email,
      active: true,
    };
    schoolData.registerSchool(newSchool)
      .then((response) => {
        this.props.setSchool(response.data);
        this.props.history.push('/');
      })
      .catch((error) => console.error('err from save profile', error));
  }

  render() {
    const { schoolExists } = this.props;
    const { schoolName, email } = this.state;

    return (
            <div className="SchoolForm">
              {(schoolExists) ? (<Redirect push to={{ pathname: '/' }} />)
                : ('')}
                <h1 className="title">Register Your School</h1>
                <img id="owl" src={owl} alt="owl"/>
                <form className="formContainer" onSubmit={this.saveSchoolEvent}>
                <div className="form-inline d-flex justify-content-center">
                  <div className="form-group row justify-content-center">
                    <label htmlFor="schoolName" className="col-form-label">School Name:</label>
                    <input
                      type="text"
                      className="form-control m-2"
                      id="schoolName"
                      value={schoolName}
                      onChange={this.nameChange}
                      placeholder="Enter School Name"
                      required
                      >
                    </input>
                </div>
                </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row">
                  <label htmlFor="email" className="col-form-label">Email:</label>
                  <input
                  type="email"
                  className="form-control m-2"
                  id="email"
                  placeholder={email}
                  value={email}
                  onChange={this.emailChange}
                  required
                  >
                  </input>
                </div>
              </div>
              <div className="buttonContainer">
                <Button variant="secondary" className="formButton" type="submit">Register School</Button>
              </div>
              </form>
            </div>
    );
  }
}

export default SchoolForm;
