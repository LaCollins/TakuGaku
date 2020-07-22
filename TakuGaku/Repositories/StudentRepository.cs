using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TakuGaku.Models;

namespace TakuGaku.Repositories
{
    public class StudentRepository
    {
        string ConnectionString;

        public StudentRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("TakuGaku");
        }

        public IEnumerable<Student> GetAllStudents()
        {
            var sql = @"SELECT *
                        FROM Student";

            using (var db = new SqlConnection(ConnectionString))
            {
                var students = db.Query<Student>(sql);

                return students;
            }
        }

        public Student GetStudentById(int studentId)
        {
            var sql = @"SELECT *
                        FROM Student
                        WHERE StudentId = @studentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var student = db.QueryFirstOrDefault<Student>(sql, new { studentId = studentId });

                return student;
            }
        }

        public Student GetStudentBySchoolUserNamePin(int schoolId, string userName, int pin)
        {
            var sql = @"SELECT *
                        FROM Student
                        WHERE SchoolId = @schoolId AND UserName = @userName AND pin = @pin";

            using (var db = new SqlConnection(ConnectionString))
            {
                var teacher = db.QueryFirstOrDefault<Student>(sql, new { SchoolId = schoolId, UserName = userName, pin = pin });

                return teacher;
            }
        }

        public Student GetStudentByUserName(string userName)
        {
            var sql = @"SELECT *
                        FROM Student
                        WHERE UserName = @userName";

            using (var db = new SqlConnection(ConnectionString))
            {
                var student = db.QueryFirstOrDefault<Student>(sql, new { UserName = userName });

                return student;
            }
        }

        public IEnumerable<Student> GetStudentsBySchoolId(int schoolId)
        {
            var sql = @"SELECT *
                        FROM Student
                        WHERE SchoolId = @schoolId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var students = db.Query<Student>(sql, new { SchoolId = schoolId });

                return students;
            }
        }

        public Student AddStudent(Student studentToAdd)
        {
            var sql = @"INSERT INTO Student(schoolId, FirstName, LastName, Birthday, GradeYear, UserName, Pin)
                        OUTPUT INSERTED.*
                        VALUES (@SchoolId, @FirstName, @LastName, @Birthday, @GradeYear, @UserName, @Pin)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Student>(sql, studentToAdd);

                return result;
            }
        }

        public Student UpdateStudent(int studentId, Student updatedStudent)
        {
            var sql = @"UPDATE Student
                        SET FirstName = @FirstName, LastName = @LastName, Birthday = @Birthday, GradeYear = @GradeYear, UserName = @UserName, Pin = @Pin
                        OUTPUT INSERTED.*
                        WHERE StudentId = @studentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    updatedStudent.FirstName,
                    updatedStudent.LastName,
                    updatedStudent.Birthday,
                    updatedStudent.GradeYear,
                    updatedStudent.UserName,
                    updatedStudent.Pin,
                    StudentId = studentId,
                };

                var result = db.QueryFirstOrDefault<Student>(sql, parameters);
                return result;
            }
        }

        public string DeleteStudent(int studentId)
        {
            var sql = @"DELETE
                        FROM Student
                        WHERE StudentId = @studentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { StudentId = studentId });

                return ($"Successfully deleted student with Id #:{studentId}");
            }
        }
    }
}
