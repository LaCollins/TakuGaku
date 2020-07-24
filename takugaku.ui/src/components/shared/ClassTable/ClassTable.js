import './ClassTable.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class ClassTable extends React.Component {
  render() {
    const { classSlot } = this.props;

    return (
            <tr className="ClassTable">
                <td>{classSlot.timeSlot}</td>
                <td>{classSlot.classTitle}</td>
                <td><Link to={''}>Assignments</Link></td>
                <td><Link to={''} className="btn btn-secondary m-0"><i className="m-1 fas fa-edit"></i></Link> <Button variant="secondary" className="m-0" onClick={this.deleteStudentEvent}><i className="m-1 fas fa-trash-alt"></i></Button></td>
            </tr>
    );
  }
}

export default ClassTable;
