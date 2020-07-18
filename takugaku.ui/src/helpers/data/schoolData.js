import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys.baseUrl;

const getSchoolByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/school/uid/${uid}`)
    .then((result) => {
      const school = result.data;

      resolve(school);
    })
    .catch((error) => reject(error));
});

const registerSchool = (newSchool) => axios.post(`${baseUrl}/api/takugaku/school`, newSchool);

export default { getSchoolByUid, registerSchool };
