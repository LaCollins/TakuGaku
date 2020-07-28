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

const addClass = (newClass) => axios.post(`${baseUrl}/api/takugaku/schedule`, newClass);

const updateClass = (classId, classInfo) => axios.put(`${baseUrl}/api/takugaku/schedule/update/${classId}`, classInfo);

const deleteClassById = (classId) => axios.delete(`${baseUrl}/api/takugaku/schedule/delete/${classId}`);

export default {
  getScheduleByStudentId, deleteClassById, addClass, updateClass,
};
