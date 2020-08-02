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
    editMode: false,
  }

  componentDidMount() {
    if (this.props.editMode) {
      this.setState({ editMode: true });
      this.setState({ schoolName: this.props.school.schoolName });
      this.setState({ email: this.props.school.email });
    }
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

  saveSchoolEvent = () => {
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

  updateSchoolEvent = () => {
    const { schoolId } = this.props.school;
    const updatedSchool = {
      schoolName: this.state.schoolName,
      uid: this.props.school.uid,
      email: this.state.email,
      active: true,
    };
    schoolData.updateSchool(schoolId, updatedSchool)
      .then((response) => {
        this.props.setSchool(response.data);
        this.props.setSuccessfullUpdate();
        this.props.setSchoolModalHide();
      })
      .catch((error) => console.error('err from save profile', error));
  }

  checkEditOrCreate = (e) => {
    e.preventDefault();
    if (this.state.editMode) {
      this.updateSchoolEvent();
    } else {
      this.saveSchoolEvent();
    }
  }


  render() {
    const { schoolExists } = this.props;
    const { schoolName, email, editMode } = this.state;

    return (
            <div className="SchoolForm">
              {schoolExists && !editMode ? (<Redirect push to={{ pathname: '/' }} />)
                : ('')}
              {editMode ? ('')
                : (<div>
                <h1 className="title">Register Your School</h1>
                <img id="owl" src={owl} alt="owl"/>
              </div>)}
                <form className="formContainer" onSubmit={this.checkEditOrCreate}>
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
              { editMode ? (<div className="buttonContainer d-flex justify-content-between">
                <Button variant="secondary" className="formButton" onClick={this.props.setSchoolModalHide}>Close</Button>
                <Button variant="secondary" className="formButton" type="submit">Save Changes</Button>
              </div>)
                : (<div className="buttonContainer">
                <Button variant="secondary" className="formButton" type="submit">Register School</Button>
                </div>)}
              </form>
            </div>
    );
  }
}

export default SchoolForm;
