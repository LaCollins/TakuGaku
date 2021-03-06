import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys.baseUrl;

const getGpaByStudentId = (studentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugagku/assignments/studentId/${studentId}/gpa`)
    .then((result) => {
      const gpa = result.data;

      resolve(gpa);
    })
    .catch((error) => reject(error));
});

const getAssignmentByStudentId = (studentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugagku/assignments/student/${studentId}`)
    .then((result) => {
      const assignments = result.data;

      resolve(assignments);
    })
    .catch((error) => reject(error));
});

const getSingleAssignment = (assignmentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugagku/assignments/assignment/${assignmentId}`)
    .then((result) => {
      const assignment = result.data;

      resolve(assignment);
    })
    .catch((error) => reject(error));
});

const getAssignmentByStudentDateClass = (studentId, date, classId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugagku/assignments/student/${studentId}/date/${date}/classId/${classId}`)
    .then((result) => {
      const assignments = result.data;

      resolve(assignments[0]);
    })
    .catch((error) => reject(error));
});

const getAssignmentType = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/assignmenttype`)
    .then((result) => {
      const assignmentTypes = result.data;
      resolve(assignmentTypes);
    })
    .catch((error) => reject(error));
});

const getDueAssignmentsByStudentId = (studentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugagku/assignments/due/studentId/${studentId}`)
    .then((result) => {
      const assignments = result.data;

      resolve(assignments);
    })
    .catch((error) => reject(error));
});

const getCompletedAssignmentsByStudentId = (studentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugagku/assignments/complete/studentId/${studentId}`)
    .then((result) => {
      const assignments = result.data;

      resolve(assignments);
    })
    .catch((error) => reject(error));
});

const getReportCards = (startDate, endDate, studentId) => new Promise((resolve) => {
  axios.get(`${baseUrl}/api/takugagku/assignments/reportcards/startdate/${startDate}/enddate/${endDate}/student/${studentId}`)
    .then((result) => {
      const assignments = result.data;

      resolve(assignments);
    })
    .catch(() => {
      const assignments = [];
      resolve(assignments);
    });
});

const updateAssignment = (assignmentId, assignmentInfo) => axios.put(`${baseUrl}/api/takugagku/assignments/update/${assignmentId}`, assignmentInfo);

const completeAssignment = (assignmentId) => axios.put(`${baseUrl}/api/takugagku/assignments/complete/assignment/${assignmentId}`);

const updateGrade = (assignmentId, grade) => axios.put(`${baseUrl}/api/takugagku/assignments/updategrade/${assignmentId}/${grade}`);

const addAssignment = (newAssignment) => axios.post(`${baseUrl}/api/takugagku/assignments`, newAssignment);

const deleteAssignment = (assignmentId) => axios.delete(`${baseUrl}/api/takugagku/assignments/delete/${assignmentId}`);

export default {
  getGpaByStudentId,
  getAssignmentByStudentId,
  getAssignmentByStudentDateClass,
  getAssignmentType,
  addAssignment,
  getDueAssignmentsByStudentId,
  deleteAssignment,
  getSingleAssignment,
  updateAssignment,
  getCompletedAssignmentsByStudentId,
  updateGrade,
  getReportCards,
  completeAssignment,
};
