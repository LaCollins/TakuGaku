import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys.baseUrl;

const getStudentBySchoolId = (schoolId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/students/schoolId/${schoolId}`)
    .then((result) => {
      const students = result.data;

      resolve(students);
    })
    .catch((error) => reject(error));
});

const getStudentById = (studentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/students/studentId/${studentId}`)
    .then((result) => {
      const student = result.data;

      resolve(student);
    })
    .catch((error) => reject(error));
});

const studentValidation = (schoolId, userName, pin) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/students/schoolId/${schoolId}/username/${userName}/pin/${pin}`)
    .then((result) => {
      const student = result.data;

      resolve(student);
    })
    .catch((error) => reject(error));
});

const deleteStudent = (studentId) => {
  axios.delete(`${baseUrl}/api/takugagku/assignments/delete/studentId/${studentId}`);
  axios.delete(`${baseUrl}/api/takugaku/schedule/delete/studentId/${studentId}`);
  axios.delete(`${baseUrl}/api/takugaku/students/delete/${studentId}`);
};

const registerStudent = (newStudent) => axios.post(`${baseUrl}/api/takugaku/students`, newStudent);

const updateStudent = (studentId, studentInfo) => axios.put(`${baseUrl}/api/takugaku/students/update/${studentId}`, studentInfo);

export default {
  getStudentBySchoolId,
  studentValidation,
  deleteStudent,
  registerStudent,
  getStudentById,
  updateStudent,
};
