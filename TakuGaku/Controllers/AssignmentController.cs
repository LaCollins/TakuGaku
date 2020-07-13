using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
