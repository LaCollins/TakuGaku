using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TakuGaku.Models
{
    public class ClassSchedule
    {
        public int ClassId { get; set; }
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public string DayOfWeek { get; set; }
        public TimeSpan TimeSlot { get; set; }
        public string ClassTitle { get; set; }
    }
}
