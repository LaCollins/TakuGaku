using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
