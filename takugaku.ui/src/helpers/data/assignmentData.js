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
};
