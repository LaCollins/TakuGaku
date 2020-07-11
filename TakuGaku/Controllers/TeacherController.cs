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
    [Route("api/takugaku/teacher")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        TeacherRepository _teacherRepository;

        public TeacherController(TeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        //Get All Teachers
        [HttpGet("all")]
        public IActionResult GetAllTeachers()
        {
            var result = _teacherRepository.GetAllTeachers();
            if(!result.Any())
            {
                return NotFound("No teachers exist");
            }

            return Ok(result);
        }

        //Get By Teacher ID
        [HttpGet("teacherId/{teacherId}")]
        public IActionResult GetTeacherById(int teacherId)
        {
            var result = _teacherRepository.GetTeacherById(teacherId);
            if (result == null)
            {
                return NotFound("No teacher exists");
            }

            return Ok(result);
        }

        //Get By School Id
        [HttpGet("schoolId/{schoolId}")]
        public IActionResult GetTeacherBySchoolId(int schoolId)
        {
            var result = _teacherRepository.GetTeacherBySchoolId(schoolId);
            if (result == null)
            {
                return NotFound("No teacher exists");
            }

            return Ok(result);
        }

        //Add Teacher
        [HttpPost]
        public IActionResult AddTeacher(Teacher teacherToAdd)
        {
            var checkUsername = _teacherRepository.GetTeacherByUserName(teacherToAdd.UserName);
            if (checkUsername == null)
            {
                var result = _teacherRepository.AddTeacher(teacherToAdd);
                return Ok(result);
            }

            return Ok("That username already exists, teacher not added.");
        }

        //Update Teacher
        [HttpPut("update/{teacherId}")]
        public IActionResult UpdateTeacher(int teacherId, Teacher updatedTeacher)
        {
            var checkUsername = _teacherRepository.GetTeacherByUserName(updatedTeacher.UserName);
            if (checkUsername == null)
            {
                var newTeacher = _teacherRepository.UpdateTeacher(teacherId, updatedTeacher);
                return Ok(newTeacher);
            }

            return Ok("That username already exists, teacher not added.");
        }

        //Delete Teacher
        [HttpDelete("delete/{teacherId}")]
        public IActionResult DeleteTeacher(int teacherId)
        {
            var result = _teacherRepository.DeleteTeacher(teacherId);

            return Ok(result);
        }
    }
}
