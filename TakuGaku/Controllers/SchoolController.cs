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

        [HttpGet("uid/{uid}")]
        public IActionResult GetSchoolByUid(string uid)
        {
            var result = _schoolRepository.GetSchoolByUid(uid);
            if (result == null)
            {
                return NotFound("No school exist");
            }

            return Ok(result);
        }

        //Add A School
        [HttpPost]
        public IActionResult AddSchool(School schoolToAdd)
        {
            var checkSchool = _schoolRepository.GetSchoolByUid(schoolToAdd.UID);
            if (checkSchool == null)
            {
                var result = _schoolRepository.AddSchool(schoolToAdd);
                return Ok(result);
            }

            return Ok("School already exists for this account");
        }

        //Close A School
        [HttpPut("close/{schoolId}")]
        public IActionResult CloseSchool(int schoolId)
        {
            var result = _schoolRepository.CloseSchool(schoolId);
            return Ok(result);
        }

        //Open School
        //Close A School
        [HttpPut("open/{schoolId}")]
        public IActionResult OpenSchool(int schoolId)
        {
            var result = _schoolRepository.OpenSchool(schoolId);
            return Ok(result);
        }
    }
}
