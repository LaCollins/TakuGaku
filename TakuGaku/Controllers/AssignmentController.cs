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
    [Route("api/takugagku/assignments")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        AssignmentRepository _assignmentRepository;

        public AssignmentController(AssignmentRepository assignmentRepository)
        {
            _assignmentRepository = assignmentRepository;
        }

        //Get all assignments
        [HttpGet]
        public IActionResult GetAllAssignments()
        {
            var result = _assignmentRepository.GetAllAssignments();
            if (!result.Any())
            {
                return NotFound("No assignments exist");
            }

            return Ok(result);
        }

        // Get assignments by student ID
        [HttpGet("student/{studentId}")]
        public IActionResult GetAssignmentsByStudent(int studentId)
        {
            var result = _assignmentRepository.GetAssignmentsByStudent(studentId);
            if (!result.Any())
            {
                return NotFound("no assignments found");
            }

            return Ok(result);
        }

        [HttpGet("student/{studentId}/date/{date}/classId/{classId}")]
        public IActionResult GetAssignmentsByStudentDateClass(int studentId, string date, int classId)
        {
            var result = _assignmentRepository.GetAssignmentsByStudentDateClass(studentId, date, classId);
            if (!result.Any())
            {
                return NotFound("no assignments found");
            }

            return Ok(result);
        }

        [HttpGet("gpa")]
        public IActionResult GetAllGradePointAverages()
        {
            var result = _assignmentRepository.GetAllGradePointAverages();
            if (!result.Any())
            {
                return NotFound("no GPA");
            }

            return Ok(result);
        }

        [HttpGet("studentId/{studentId}/gpa")]
        public IActionResult GetGradePointAverageById(int studentId)
        {
            var result = _assignmentRepository.GetGradePointAverageById(studentId);
            if (result == null)
            {
                return NotFound("no GPA");
            }

            return Ok(result);
        }

        // Get by subject
        [HttpGet("subject/{subjectId}")]
        public IActionResult GetAssignmentsBySubject(int subjectId)
        {
            var result = _assignmentRepository.GetAssignmentsBySubject(subjectId);
            if (!result.Any())
            {
                return NotFound("no assignments found");
            }

            return Ok(result);
        }

        //get single assignment
        [HttpGet("assignment/{assignmentId}")]
        public IActionResult GetAssignmentById(int assignmentId)
        {
            var result = _assignmentRepository.GetAssignmentById(assignmentId);
            if (result == null)
            {
                return NotFound("no assignments found");
            }

            return Ok(result);
        }

        [HttpGet("due/studentId/{studentId}")]
        public IActionResult GetDueAssignments(int studentId)
        {
            var result = _assignmentRepository.GetAssignmentsDue(studentId);

            if (!result.Any())
            {
                return NotFound("no assignments found");
            }
            return Ok(result);
        }

        [HttpGet("complete/studentId/{studentId}")]
        public IActionResult GetCompletedAssignments(int studentId)
        {
            var result = _assignmentRepository.GetCompletedAssignments(studentId);

            if (!result.Any())
            {
                return NotFound("no assignments found");
            }
            return Ok(result);
        }

        //Add assignment
        [HttpPost]
        public IActionResult AddAssignment(Assignment assignmentToAdd)
        {
            var dateAssigned = assignmentToAdd.DateAssigned.ToString();

            var checkExistingAssignment = _assignmentRepository.GetAssignmentsByStudentDateClass(assignmentToAdd.StudentId, dateAssigned, assignmentToAdd.ClassId);

            if (checkExistingAssignment.Any())
            {
                return Ok("There is already an existing assignment");
            } else
            {
                var result = _assignmentRepository.AddAssignment(assignmentToAdd);
                return Ok(result);
            }
        }

        [HttpPut("updategrade/{assignmentId}/{grade}")]
        public IActionResult updateGrade(int assignmentId, decimal grade)
        {
            var updatedAssignment = _assignmentRepository.UpdateGrade(assignmentId, grade);
            return Ok(updatedAssignment);
        }


        // update assignment
        [HttpPut("update/{assignmentId}")]
        public IActionResult UpdateAssignment(int assignmentId, Assignment updatedAssignment)
        {
              var newClass = _assignmentRepository.UpdateAssignment(assignmentId, updatedAssignment);
              return Ok(newClass);

        }

        [HttpDelete("delete/{assignmentId}")]
        public IActionResult DeleteAssignment(int assignmentId)
        {
            var result = _assignmentRepository.DeleteAssignment(assignmentId);

            return Ok(result);
        }

        [HttpDelete("delete/studentId/{studentId}")]
        public IActionResult DeleteAssignmentByStudentId(int studentId)
        {
            var result = _assignmentRepository.DeleteAssignmentByStudentId(studentId);

            return Ok(result);
        }
    }
}
