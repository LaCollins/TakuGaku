import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys.baseUrl;

const getAllSubjects = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/subjects`)
    .then((result) => {
      const subjects = result.data;

      resolve(subjects);
    })
    .catch((error) => reject(error));
});

export default { getAllSubjects };
