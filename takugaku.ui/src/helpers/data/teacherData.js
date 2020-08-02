import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys.baseUrl;

const getTeacherBySchoolId = (schoolId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/teacher/schoolId/${schoolId}`)
    .then((result) => {
      const teacher = result.data;

      resolve(teacher);
    })
    .catch((error) => reject(error));
});

const teacherValidation = (schoolId, userName, pin) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/takugaku/teacher/schoolId/${schoolId}/username/${userName}/pin/${pin}`)
    .then((result) => {
      const teacher = result.data;

      resolve(teacher);
    })
    .catch((error) => reject(error));
});

const registerTeacher = (newTeacher) => axios.post(`${baseUrl}/api/takugaku/teacher`, newTeacher);

const updateTeacher = (teacherId, updatedTeacher) => axios.put(`${baseUrl}/api/takugaku/teacher/update/${teacherId}`, updatedTeacher);

export default {
  getTeacherBySchoolId,
  registerTeacher,
  teacherValidation,
  updateTeacher,
};
