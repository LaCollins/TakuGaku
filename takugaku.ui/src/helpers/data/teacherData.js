import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys.baseUrl;

const getTeacherBySchoolId = (schoolId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/teacher/schoolId/${schoolId}`)
    .then((result) => {
      const school = result.data;

      resolve(school);
    })
    .catch((error) => reject(error));
});

const registerTeacher = (newTeacher) => axios.post(`${baseUrl}/api/takugaku/teacher`, newTeacher);

export default { getTeacherBySchoolId, registerTeacher };
