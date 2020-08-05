import './SingleAssignment.scss';
import React from 'react';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import assignmentData from '../../../helpers/data/assignmentData';

class SingleAssignment extends React.Component {
    state = {
      assignmentType: '',
      assignment: [],
    }

    getAssignmentTypes = () => {
      assignmentData.getAssignmentType()
        .then((response) => {
          for (let i = 0; i < response.length; i += 1) {
            if (response[i].assignmentTypeId === this.props.location.state.assignment.assignmentTypeId) {
              this.setState({ assignmentType: response[i].assignmentType });
            }
          }
        })
        .catch((error) => console.error(error));
    }

    componentDidMount() {
      if (!this.props.location.state.fromTable) {
        this.setState({ assignment: this.props.location.state }, () => this.getAssignmentTypes());
      } else {
        this.setState({ assignmentType: this.props.location.state.assignment.assignmentType, assignment: this.props.location.state });
      }
    }

    markComplete = () => {
      assignmentData.completeAssignment(this.props.location.state.assignment.assignmentId)
        .then(() => {
          if (this.props.teacherLoggedIn) {
            this.props.history.push('/manage/assignments');
          } else {
            this.props.history.push(`/assignments/student/${this.props.student.studentId}`);
          }
        })
        .catch((error) => console.error(error));
    }

    render() {
      const { assignment } = this.props.location.state;
      const { assignmentType } = this.state;
      return (
            <div className="SingleAssignment container">
            { !this.props.studentLoggedIn && !this.props.teacherLoggedIn ? (<Redirect push to={{ pathname: '/' }} />)
              : ('')}
                <Card>
                <Card.Header as="h5">{assignment.assignmentTitle}<Card.Title>{assignmentType}</Card.Title></Card.Header>
                <Card.Body>
                    <Card.Text>
                     <strong>Instructions:</strong> {assignment.instructions}
                     <div className="mt-2">
                     <strong>URL: </strong><a href={assignment.link} target="_blank" rel="noopener noreferrer">{assignment.link}</a></div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                      <div className="footerContainer">
                      <strong>Due Date: </strong>{moment(assignment.dueDate).format('MMMM Do YYYY')}
                        <div className="buttonContainer">
                        { assignment.completed ? ('')
                          : (<Button variant="secondary" className="complete" onClick={this.markComplete}>Mark Complete</Button>)}
                      </div>
                      </div>
                </Card.Footer>
                </Card>
                {this.props.studentLoggedIn ? (<div><Link to="/viewschedule" className="btn btn-secondary backButton">Back To Schedule</Link>
                <Link to={`/assignments/student/${this.props.student.studentId}`} className="btn btn-secondary backButton">Back To Assignments</Link></div>)
                  : ('')}
                {this.props.teacherLoggedIn ? (<Link to="/manage/schedules" className="btn btn-secondary backButton">Back</Link>)
                  : ('')}
            </div>
      );
    }
}

export default SingleAssignment;
