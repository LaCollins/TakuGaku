import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys.baseUrl;

const getScheduleByStudentId = (studentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/schedule/student/${studentId}`)
    .then((result) => {
      const classes = result.data;

      resolve(classes);
    })
    .catch((error) => reject(error));
});

export default { getScheduleByStudentId };
