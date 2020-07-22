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

export default { getGpaByStudentId };
