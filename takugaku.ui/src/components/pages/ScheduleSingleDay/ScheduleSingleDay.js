import React from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import scheduleData from '../../../helpers/data/scheduleData';
import ClassTable from '../../shared/ClassTable/ClassTable';
import './ScheduleSingleDay.scss';
import ClassForm from '../ClassForm/ClassForm';

class ScheduleSingleDay extends React.Component {
    state = {
      classModalShow: false,
      editClassModalShow: false,
      selectedTimeSlot: '',
      selectedDay: '',
      selectedDate: '',
      singleStudent: [],
      classSlot: [],
      assignments: [],
      scheduleArray: [
        { timeSlot: '08:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '09:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '10:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '11:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '12:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '13:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '14:00:00', assignment: { assignmentTitle: '' } },
        { timeSlot: '15:00:00', assignment: { assignmentTitle: '' } },
      ],
    }

    AddClassModal = (props) => (
      <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                  Add A Class
              </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <ClassForm
                  student={this.props.singleStudent}
                  timeSlot={this.state.selectedTimeSlot}
                  selectedDate={this.props.selectedDate}
                  selectedDay={this.props.selectedDay}
                  assignments={this.props.assignments}
                  getScheduleById={this.props.getScheduleById}
                  setClassModalHide={this.setClassModalHide} />
              </Modal.Body>
          </Modal>
    )

    EditClassModal = (props) => (
      <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                  Edit A Class
              </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <ClassForm
                  student={this.props.singleStudent}
                  timeSlot={this.state.selectedTimeSlot}
                  selectedDate={this.props.selectedDate}
                  selectedDay={this.props.selectedDay}
                  assignments={this.props.assignments}
                  classSlot={this.state.classSlot}
                  getScheduleById={this.props.getScheduleById}
                  editMode={true}
                  setClassModalHide={this.setEditClassModalHide} />
              </Modal.Body>
          </Modal>
    )

    deleteClass = (classId) => {
      scheduleData.deleteClassById(classId)
        .then(() => {
          this.props.getScheduleById();
        })
        .catch((error) => console.error(error));
    }

    checkDate = () => {
      const { selectedDate } = this.props;
      this.setState({ selectedDate });
    }

    setClassModalShow = (timeSlot) => {
      this.setState({ selectedTimeSlot: timeSlot, classModalShow: true });
    }

    setClassModalHide = () => {
      this.setState({ classModalShow: false });
    }

    setEditClassModalShow = (timeSlot, classSlot) => {
      this.setState({ selectedTimeSlot: timeSlot, classSlot, editClassModalShow: true });
    }

    setEditClassModalHide = () => {
      this.setState({ editClassModalShow: false });
    }

    componentDidMount() {
      const { scheduleArray } = this.props;
      const { selectedDate } = this.props;
      const { selectedDay } = this.props;
      const { assignments } = this.props;
      const { singleStudent } = this.props;

      this.setState({ selectedDate, selectedDay, assignments });

      this.setState({ scheduleArray, singleStudent });

      this.checkDate();
    }

    render() {
      const {
        singleStudent,
        selectedDay,
        scheduleArray,
        selectedDate,
        assignments,
      } = this.props;

      const { classModalShow, editClassModalShow } = this.state;

      const viewingDate = moment(selectedDate).format('MMMM Do YYYY');
      return (
            <div className="ScheduleSingleDay">
                <h4>{singleStudent.firstName}'s Class Schedule for {selectedDay.toUpperCase()}</h4>
                <h5 className="mb-4">You are currently viewing assignments for {viewingDate}</h5>
                <this.AddClassModal show={classModalShow} onHide={() => this.setState({ classModalShow: false })} />
                <this.EditClassModal show={editClassModalShow} onHide={() => this.setState({ editClassModalShow: false })} />
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Time</th>
                        <th>Class Name</th>
                        <th>Assignment</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleArray.map((classSlot) => <ClassTable key={classSlot.timeSlot}
                        student={singleStudent}
                        classSlot={classSlot}
                        selectedDate={selectedDate}
                        selectedDay={selectedDay}
                        assignments={assignments}
                        deleteClass={this.deleteClass}
                        setEditClassModalShow={this.setEditClassModalShow}
                        setClassModalShow={this.setClassModalShow} />)}
                    </tbody>
                    </Table>
            </div>
      );
    }
}

export default ScheduleSingleDay;
