using Dapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TakuGaku.Models;

namespace TakuGaku.Repositories
{
    public class AssignmentRepository
    {
        string ConnectionString;

        public AssignmentRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("TakuGaku");
        }

        public IEnumerable<Assignment> GetAllAssignments()
        {
            var sql = @"SELECT *
                        FROM assignment";

            using (var db = new SqlConnection(ConnectionString))
            {
                var assignments = db.Query<Assignment>(sql);

                return assignments;
            }
        }

        public IEnumerable<GradePointAverage> GetAllGradePointAverages()
        {
            var sql = @"SELECT studentId, avg(grade) as GPA
                        FROM assignment
                        WHERE Completed = 1 AND Grade != 0.00 AND classId != 53
                        GROUP BY studentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var GPA = db.Query<GradePointAverage>(sql);

                return GPA;
            }
        }

        public GradePointAverage GetGradePointAverageById(int studentId)
        {
            var sql = @"SELECT studentId, avg(grade) as GPA
                        FROM assignment
                        WHERE Completed = 1 AND StudentId = @studentId
                        GROUP BY studentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var GPA = db.QueryFirstOrDefault<GradePointAverage>(sql, new { StudentId = studentId });

                return GPA;
            }
        }

        public IEnumerable<Assignment> GetAssignmentsByStudent(int studentId)
        {
            var sql = @"SELECT *
                        FROM assignment
                        WHERE StudentId = @studentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var assignments = db.Query<Assignment>(sql, new { StudentId = studentId });

                return assignments;
            }
        }

        public IEnumerable<Assignment> GetAssignmentsByStudentDateClass(int studentId, string dateAssigned, int classId)
        {
            var sql = @"SELECT *
                        FROM assignment
                        WHERE StudentId = @studentId AND DateAssigned = @dateAssigned AND ClassId = @classId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var assignments = db.Query<Assignment>(sql, new { StudentId = studentId, DateAssigned = dateAssigned, ClassId = classId });

                return assignments;
            }
        }

        public IEnumerable<Assignment> GetAssignmentsBySubject(int subjectId)
        {
            var sql = @"SELECT *
                        FROM assignment
                        WHERE SubjectId = @subjectId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var assignments = db.Query<Assignment>(sql, new { SubjectId = subjectId });

                return assignments;
            }
        }

        public IEnumerable<AssignmentWithClassname> GetAssignmentsDue(int studentId)
        {
            var sql = @"SELECT assignment.assignmentId, classSchedule.classTitle as className, assignment.assignmentTitle, assignmentType.assignmentType, assignment.dateAssigned, assignment.dateDue
                        FROM assignment
                        JOIN classSchedule
                        ON assignment.classId = classSchedule.classId
                        JOIN assignmentType
                        ON assignment.assignmentTypeId = assignmentType.assignmentTypeId
                        WHERE assignment.completed = 0 AND assignment.StudentId = @studentId
                        ORDER BY dateAssigned";

            using (var db = new SqlConnection(ConnectionString))
            {
                var assignments = db.Query<AssignmentWithClassname>(sql, new { StudentId = studentId });

                return assignments;
            }
        }

        public IEnumerable<CompletedAssignment> GetCompletedAssignments(int studentId)
        {
            var sql = @"SELECT assignment.assignmentId, classSchedule.classTitle as className, 
                        assignment.assignmentTitle, assignmentType.assignmentType, assignment.dateAssigned,
                        assignment.dateDue, assignment.dateComplete, assignment.grade
                        FROM assignment
                        JOIN classSchedule
                        ON assignment.classId = classSchedule.classId
                        JOIN assignmentType
                        ON assignment.assignmentTypeId = assignmentType.assignmentTypeId
                        WHERE assignment.completed = 1 AND assignment.StudentId = @studentId
                        ORDER BY dateAssigned";

            using (var db = new SqlConnection(ConnectionString))
            {
                var assignments = db.Query<CompletedAssignment>(sql, new { StudentId = studentId });

                return assignments;
            }
        }

        public Assignment GetAssignmentById(int assignmentId)
        {
            var sql = @"SELECT *
                        FROM assignment
                        WHERE AssignmentId = @assignmentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var assignment = db.QueryFirstOrDefault<Assignment>(sql, new { AssignmentId = assignmentId });

                return assignment;
            }
        }

        public Assignment AddAssignment(Assignment assignmentToAdd)
        {
            var sql = @"INSERT INTO assignment(studentId, classId, assignmentTypeId, subjectId, instructions, completed, grade, dateAssigned, dateDue, dateComplete, assignmentTitle, link)
                        OUTPUT INSERTED.*
                        VALUES (@studentId, @classId, @assignmentTypeId, @subjectId, @instructions, @completed, @grade, @dateAssigned, @dateDue, @dateComplete, @assignmentTitle, @link)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Assignment>(sql, assignmentToAdd);

                return result;
            }
        }

        public string UpdateGrade(int assignmentId, decimal grade)
        {
            var sql = @"UPDATE assignment
                        SET grade = @grade
                        WHERE assignmentId = @assignmentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { AssignmentId = assignmentId, Grade = grade });
                return ("Successfully added grade");
            }
        }

        public Assignment UpdateAssignment(int assignmentId, Assignment updatedAssignment)
        {
            var sql = @"UPDATE assignment
                        SET StudentId = @studentId, ClassId = @classId, AssignmentTypeId = @assignmentTypeId,
                            SubjectId = @subjectId, Instructions = @instructions, Completed = @completed, Grade = @grade,
                            DateAssigned = @dateAssigned, DateDue = @dateDue, DateComplete = @dateComplete, AssignmentTitle = @assignmentTitle, Link = @link
                        OUTPUT INSERTED.*
                        WHERE AssignmentId = @assignmentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    updatedAssignment.StudentId,
                    updatedAssignment.ClassId,
                    updatedAssignment.AssignmentTypeId,
                    updatedAssignment.SubjectId,
                    updatedAssignment.Instructions,
                    updatedAssignment.Completed,
                    updatedAssignment.Grade,
                    updatedAssignment.DateAssigned,
                    updatedAssignment.DateDue,
                    updatedAssignment.DateComplete,
                    updatedAssignment.AssignmentTitle,
                    updatedAssignment.Link,
                    AssignmentId = assignmentId
                };

                var result = db.QueryFirstOrDefault<Assignment>(sql, parameters);
                return result;
            }
        }


        public string DeleteAssignment(int assignmentId)
        {
            var sql = @"DELETE
                        FROM assignment
                        WHERE AssignmentId = @assignmentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { AssignmentId = assignmentId });

                return ($"Successfully deleted assignment with Id #:{assignmentId}");
            }
        }

        public string DeleteAssignmentByStudentId(int studentId)
        {
            var sql = @"DELETE
                        FROM assignment
                        WHERE StudentId = @studentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { StudentId = studentId });

                return ($"Successfully deleted assignment with studentId #:{studentId}");
            }
        }
    }
}
