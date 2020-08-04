using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TakuGaku.Models;
using TakuGaku.Repositories;

namespace TakuGaku.Controllers
{
    [Route("api/takugaku/students")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        StudentRepository _studentRepository;

        public StudentController(StudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        //Get All Students
        [HttpGet]
        public IActionResult GetAllStudents()
        {
            var result = _studentRepository.GetAllStudents();
            if (!result.Any())
            {
                return NotFound("No students exist");
            }

            return Ok(result);
        }

        //Get By Student ID
        [HttpGet("studentId/{studentId}")]
        public IActionResult GetStudentById(int studentId)
        {
            var result = _studentRepository.GetStudentById(studentId);
            if (result == null)
            {
                return NotFound("No student exists");
            }

            return Ok(result);
        }

        //Get By School Id
        [HttpGet("schoolId/{schoolId}")]
        public IActionResult GetStudentsBySchoolId(int schoolId)
        {
            var result = _studentRepository.GetStudentsBySchoolId(schoolId);
            if (result == null)
            {
                return NotFound("No students exist");
            }

            return Ok(result);
        }

        [HttpGet("schoolId/{schoolId}/username/{userName}/pin/{pin}")]
        public IActionResult GetStudentBySchoolUsernameAndPin(int schoolId, string userName, int pin)
        {
            var result = _studentRepository.GetStudentBySchoolUserNamePin(schoolId, userName, pin);
            if (result == null)
            {
                return Ok("No student exists");
            }

            return Ok(result);
        }

        //Add Student
        [HttpPost]
        public IActionResult AddStudent(Student studentToAdd)
        {
            var checkUsername = _studentRepository.GetStudentByUserName(studentToAdd.UserName);
            if(checkUsername == null)
            {
                var result = _studentRepository.AddStudent(studentToAdd);
                return Ok(result);
            }

            return Ok("That username already exists, student not added");
        }

        //Update Student
        [HttpPut("update/{studentId}")]
        public IActionResult UpdateStudent(int studentId, Student updatedStudent)
        {
            var checkUsername = _studentRepository.GetStudentByUserName(updatedStudent.UserName);
            if (checkUsername.UserName == updatedStudent.UserName && checkUsername.StudentId == studentId)
            {
                var newStudent= _studentRepository.UpdateStudent(studentId, updatedStudent);
                return Ok(newStudent);
            } else if (checkUsername == null)
            {
                var newStudent = _studentRepository.UpdateStudent(studentId, updatedStudent);
                return Ok(newStudent);
            }

            return Ok("That username already exists, student not added");
        }

        //Delete Student
        [HttpDelete("delete/{studentId}")]
        public IActionResult DeleteStudent(int studentId)
        {
            var result = _studentRepository.DeleteStudent(studentId);

            return Ok(result);
        }
    }
}
