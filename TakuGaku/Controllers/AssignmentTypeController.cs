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
    [Route("api/takugaku/assignmenttype")]
    [ApiController]
    public class AssignmentTypeController : ControllerBase
    {
        AssignmentTypeRepository _assignmentTypeRepository;

        public AssignmentTypeController(AssignmentTypeRepository assignmentTypeRepository)
        {
            _assignmentTypeRepository = assignmentTypeRepository;
        }

        [HttpGet]
        public IActionResult GetAllAssignmentTypes()
        {
            var result = _assignmentTypeRepository.GetAllAssignmentTypes();
            if (!result.Any())
            {
                return NotFound("No assignment types found");
            }

            return Ok(result);
        }

        [HttpGet("assignmentTypeId/{assignmentTypeId}")]
        public IActionResult GetAssignmentTypeById(int assignmentTypeId)
        {
            var result = _assignmentTypeRepository.GetAssignmentTypeById(assignmentTypeId);
            if (result == null)
            {
                return NotFound("No assignment type exists");
            }

            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddAssignmentType(AssignmentTypeModel assignmentTypeToAdd)
        {
            var checkExistingAssignmentType = _assignmentTypeRepository.GetAssignmentTypeByType(assignmentTypeToAdd.AssignmentType);
            if (checkExistingAssignmentType == null)
            {
                var result = _assignmentTypeRepository.AddAssignmentType(assignmentTypeToAdd);
                return Ok(result);
            }

            return Ok("That assignment type already exists");
        }

        [HttpDelete("delete/{assignmentTypeId}")]
        public IActionResult DeleteAssignmentType(int assignmentTypeId)
        {
            var result = _assignmentTypeRepository.DeleteAssignmentType(assignmentTypeId);

            return Ok(result);
        }
    }
}
