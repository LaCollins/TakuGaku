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
    [Route("api/takugaku/schedule")]
    [ApiController]
    public class ClassScheduleController : ControllerBase
    {
        ClassScheduleRepository _classScheduleRepository;

        public ClassScheduleController(ClassScheduleRepository classScheduleRepository)
        {
            _classScheduleRepository = classScheduleRepository;
        }

        [HttpGet]
        public IActionResult GetAllClasses()
        {
            var result = _classScheduleRepository.GetAllClasses();
            if (!result.Any())
            {
                return NotFound("No classes exist");
            }

            return Ok(result);
        }

        [HttpGet("student/{studentId}")]
        public IActionResult GetClassByStudent(int studentId)
        {
            var result = _classScheduleRepository.GetClassByStudent(studentId);
            if (!result.Any())
            {
                return NotFound("no classes found");
            }

            return Ok(result);
        }

        [HttpGet("subject/{subjectId}")]
        public IActionResult GetClassBySubject(int subjectId)
        {
            var result = _classScheduleRepository.GetClassBySubject(subjectId);
            if (!result.Any())
            {
                return NotFound("no classes found");
            }

            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddClass(ClassSchedule classToAdd)
        {
            var checkExistingClass = _classScheduleRepository.CheckExistingClass(classToAdd);

            if (checkExistingClass == false)
            {
                var result = _classScheduleRepository.AddClass(classToAdd);
                return Ok(result);
            }

            return Ok("That class already exists, class not added.");
        }

        [HttpPut("update/{classId}")]
        public IActionResult UpdateClass(int classId, ClassSchedule updatedClass)
        {
            var checkTimeslot = _classScheduleRepository.CheckOpenTimeslot(updatedClass);

            if (checkTimeslot == true)
            {
                var newClass = _classScheduleRepository.UpdateClass(classId, updatedClass);
                return Ok(newClass);
            }

            return Ok("That timeslot is full. Class not changed.");
        }

        [HttpDelete("delete/{classId}")]
        public IActionResult DeleteClass(int classId)
        {
            var result = _classScheduleRepository.DeleteClass(classId);

            return Ok(result);
        }

        [HttpDelete("delete/studentId/{studentId}")]
        public IActionResult DeleteClassByStudentId(int studentId)
        {
            var result = _classScheduleRepository.DeleteClassByStudentId(studentId);

            return Ok(result);
        }

    }
}
