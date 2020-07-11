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
    [Route("api/takugaku/subjects")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        SubjectRepository _subjectRepository;

        public SubjectController(SubjectRepository subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }

        [HttpGet]
        public IActionResult GetAllSubjects()
        {
            var result = _subjectRepository.GetAllSubjects();
            if (!result.Any())
            {
                return NotFound("No subjects found");
            }

            return Ok(result);
        }

        [HttpGet("subjectId/{subjectId}")]
        public IActionResult GetSubjectById(int subjectId)
        {
            var result = _subjectRepository.GetSubjectById(subjectId);
            if (result == null)
            {
                return NotFound("No subject exists");
            }

            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddSubject(Subject subjectToAdd)
        {
            var checkExistingSubject = _subjectRepository.GetSubjectByType(subjectToAdd.SubjectType);
            if(checkExistingSubject == null)
            {
                var result = _subjectRepository.AddSubject(subjectToAdd);
                return Ok(result);
            }

            return Ok("That subject already exists");
        }

        [HttpDelete("delete/{subjectId}")]
        public IActionResult DeleteSubject(int subjectId)
        {
            var result = _subjectRepository.DeleteSubject(subjectId);

            return Ok(result);
        }
    }
}
