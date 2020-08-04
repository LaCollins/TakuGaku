using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TakuGaku.Models
{
    public class Assignment
    {
        public int AssignmentId { get; set; }
        public int StudentId { get; set; }
        public int ClassId { get; set; }
        public int AssignmentTypeId { get; set; }
        public int SubjectId { get; set; }
        public string Instructions { get; set; }
        public bool Completed { get; set; }
        public decimal Grade { get; set; }
        public DateTime DateAssigned { get; set; }
        public DateTime DateDue { get; set; }
        public DateTime DateComplete { get; set; }
        public string AssignmentTitle { get; set; }
        public string Link { get; set; }
    }

    public class GradePointAverage
    {
        public decimal GPA { get; set; }
        public int StudentId { get; set; }

    }

    public class AssignmentWithClassname
    {
        public int AssignmentId { get; set; }
        public string ClassName { get; set; }
        public string AssignmentTitle { get; set; }
        public string AssignmentType { get; set; }
        public DateTime DateAssigned { get; set; }
        public DateTime DateDue { get; set; }
        public string Instructions { get; set; }
        public string Link { get; set; }
    }

    public class CompletedAssignment
    {
        public int AssignmentId { get; set; }
        public string ClassName { get; set; }
        public string AssignmentTitle { get; set; }
        public string AssignmentType { get; set; }
        public DateTime DateAssigned { get; set; }
        public DateTime DateDue { get; set; }
        public DateTime DateComplete { get; set; }
        public decimal Grade { get; set; }
    }

    public class ReportCardWithClasses
    {
        public int StudentId { get; set; }
        public string ClassTitle { get; set; }
        public string SubjectType { get; set; }
        public decimal Grade { get; set; }
    }

}
