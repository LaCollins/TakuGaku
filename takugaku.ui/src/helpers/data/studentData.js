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

const studentValidation = (schoolId, userName, pin) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/students/schoolId/${schoolId}/username/${userName}/pin/${pin}`)
    .then((result) => {
      const student = result.data;

      resolve(student);
    })
    .catch((error) => reject(error));
});

export default { getStudentBySchoolId, studentValidation };
