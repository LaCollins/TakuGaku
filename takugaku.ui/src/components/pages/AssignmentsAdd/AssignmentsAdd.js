import './AssignmentsAdd.scss';
import React from 'react';
import moment from 'moment';

class AssignmentsAdd extends React.Component {
    state = {
      classes: [],
      classId: '',
      assignmentTypeId: '',
      subjectId: '',
      assignedDate: '',
      dueDate: '',
      details: '',
      url: '',
      dayOfWeek: '',
    }

    classChange = (e) => {
      e.preventDefault();
      const classInfo = e.target.value.split(' ');
      this.setState({ classId: classInfo[0] });
      this.setState({ subjectId: classInfo[1] });
      this.setState({ dayOfWeek: classInfo[2] });
    }

    assignmentTypeChange = (e) => {
      e.preventDefault();
      this.setState({ assignmentTypeId: e.target.value });
    }

    assginedDateChange = (e) => {
      e.preventDefault();
      this.setState({ assignedDate: e.target.value });
      this.checkClassDay(e.target.value);
    }

    checkClassDay = (date) => {
      const newDate = `${date}T00:00:00`;
      const day = moment(newDate, 'YYYY-MM-DD HH:mm:ss').format('dddd').toLowerCase();
      if (this.state.dayOfWeek !== day) {
        console.error('not the same day', day, this.state.dayOfWeek);
      } else {
          console.error(this.state.dayOfWeek, day);
      }
    }

    removeLunch = () => {
      const { classes } = this.props;
      for (let i = 0; i < classes.length; i += 1) {
        if (classes[i].subjectId === 12) {
          classes.splice(i, 1);
        }
      }
      this.sortClasses(classes);
    }

    sortClasses = (classes) => {
      classes.sort((a, b) => {
        if (a.dayOfWeek < b.dayOfWeek) return -1;
        if (a.dayOfWeek > b.dayOfWeek) return 1;
        return 0;
      });
      classes.sort((a, b) => {
        if (a.classTitle < b.classTitle) return -1;
        if (a.classTitle > b.classTitle) return 1;
        return 0;
      });
      this.setState({ classes });
    }

    componentDidMount() {
      this.removeLunch();
      this.setState({ assignments: this.props.assignments });
    }

    render() {
      const { classes, assignedDate } = this.state;
      const { assignmentTypes } = this.props;

      return (
            <div className="AssignmentsAdd container">
                <h3>Add Assignment</h3>
                <div className="form-inline d-flex justify-content-left">
                <div className="col-auto ml-2">
                <label htmlFor="class" className="col-form-label">Class:</label>
                <select type="class" className="custom-select mr-sm-2" id="class" onChange={this.classChange} required>
                  <option defaultValue="">Choose...</option>
                  {classes.map((classSlot) => (<option key={classSlot.classId} value={`${classSlot.classId} ${classSlot.subjectId} ${classSlot.dayOfWeek}`}>{classSlot.classTitle} - {classSlot.dayOfWeek}</option>))}
                </select>
                <label htmlFor="assignmentType" className="col-form-label">Assignment Type:</label>
                <select type="assignmentType" className="custom-select mr-sm-2" id="assignmentType" onChange={this.assignmentTypeChange} required>
                  <option defaultValue="">Choose...</option>
                  {assignmentTypes.map((at) => (<option key={at.assignmentTypeId} value={at.assignmentTypeId}>{at.assignmentType}</option>))}
                </select>
                <label htmlFor="dateAssigned" className="col-form-label">Date Assgined:</label>
                    <input
                        type="date"
                        className="form-control m-2"
                        id="dateAssigned"
                        value={assignedDate}
                        onChange={this.assginedDateChange}
                        placeholder="Select A Date"
                        required
                        >
                    </input>
                </div>
                </div>
            </div>
      );
    }
}

export default AssignmentsAdd;
