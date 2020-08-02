import './AccountManagement.scss';
import { Redirect } from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TeacherRegistration from '../TeacherRegistration/TeacherRegistration';

class AccountManagement extends React.Component {
    state = {
      teacherModalShow: false,
      successfullUpdate: false,
    }

    EditTeacherModal = (props) => (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Teacher
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TeacherRegistration editMode={true}
                    teacher={this.props.teacher}
                    setTeacherModalHide={this.setTeacherModalHide}
                    school={this.props.school}
                    setTeacherExists={this.props.setTeacherExists}
                    setSuccessfullUpdate={this.setSuccessfullUpdate}/>
                </Modal.Body>
            </Modal>
    )

    setSuccessfullUpdate = () => {
      this.setState({ successfullUpdate: true });
    }

    setTeacherModalShow = () => {
      this.setState({ teacherModalShow: true });
    }

      setTeacherModalHide = () => {
        this.setState({ teacherModalShow: false });
      }

      render() {
        const { teacherModalShow, successfullUpdate } = this.state;
        return (
            <div className="AccountManagement">
            { !this.props.teacherLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
              : ('')}
                <this.EditTeacherModal show={teacherModalShow} onHide={() => this.setState({ teacherModalShow: false })} />
                <h1>Account Management</h1>
                <div className="container">
                    { successfullUpdate ? (<p className="warning">Update was successful!</p>)
                      : ('')}
                </div>
                <div className="container d-flex justify-content-around buttonContainer">
                    <Button variant="secondary" className="formButton" onClick={this.setTeacherModalShow}>Edit Teacher Information</Button>
                    <Button variant="secondary" className="formButton">Edit School Information</Button>
                </div>
            </div>
        );
      }
}

export default AccountManagement;
