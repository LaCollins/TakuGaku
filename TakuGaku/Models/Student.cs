using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TakuGaku.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public int SchoolId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public int GradeYear { get; set; }
        public string UserName { get; set; }
        public int Pin { get; set; }

    }
}
