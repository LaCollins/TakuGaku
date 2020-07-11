using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TakuGaku.Models
{
    public class Teacher
    {
        public int TeacherId { get; set; }
        public int SchoolId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public int Pin { get; set; }
    }
}
