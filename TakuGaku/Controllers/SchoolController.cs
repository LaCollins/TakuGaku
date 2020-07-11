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
    [Route("api/takugaku/school")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        SchoolRepository _schoolRepository;

        public SchoolController(SchoolRepository schoolRepository)
        {
            _schoolRepository = schoolRepository;
        }

        //Get All Schools
        [HttpGet]
        public IActionResult GetAllSchools()
        {
            var result = _schoolRepository.GetAllSchools();
            if(!result.Any())
            {
                return NotFound("No schools exist");
            }

            return Ok(result);
        }

        //Get Single School
        [HttpGet("{schoolId}")]
        public IActionResult GetSchoolById(int schoolId)
        {
            var result = _schoolRepository.GetSchoolById(schoolId);
            if (result == null)
            {
                return NotFound("No school exist");
            }

            return Ok(result);
        }
    }
}
