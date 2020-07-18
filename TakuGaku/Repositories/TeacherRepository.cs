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
    public class TeacherRepository
    {
        string ConnectionString;

        public TeacherRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("TakuGaku");
        }

        public IEnumerable<Teacher> GetAllTeachers()
        {
            var sql = @"SELECT *
                        FROM Teacher";

            using (var db = new SqlConnection(ConnectionString))
            {
                var teachers = db.Query<Teacher>(sql);

                return teachers;
            }
        }

        public Teacher GetTeacherById(int teacherId)
        {
            var sql = @"SELECT *
                        FROM Teacher
                        WHERE TeacherId = @teacherId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var teacher = db.QueryFirstOrDefault<Teacher>(sql, new { TeacherId = teacherId });

                return teacher;
            }
        }

        public Teacher GetTeacherByUserName(string userName)
        {
            var sql = @"SELECT *
                        FROM Teacher
                        WHERE UserName = @userName";

            using (var db = new SqlConnection(ConnectionString))
            {
                var teacher = db.QueryFirstOrDefault<Teacher>(sql, new { UserName = userName });

                return teacher;
            }
        }

        public Teacher GetTeacherBySchoolUserNamePin(int schoolId, string userName, int pin)
        {
            var sql = @"SELECT *
                        FROM Teacher
                        WHERE SchoolId = @schoolId AND UserName = @userName AND pin = @pin";

            using (var db = new SqlConnection(ConnectionString))
            {
                var teacher = db.QueryFirstOrDefault<Teacher>(sql, new { SchoolId = schoolId, UserName = userName, pin = pin });

                return teacher;
            }
        }

        public Teacher GetTeacherBySchoolId(int schoolId)
        {
            var sql = @"SELECT *
                        FROM Teacher
                        WHERE SchoolId = @schoolId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var teacher = db.QueryFirstOrDefault<Teacher>(sql, new { SchoolId = schoolId });

                return teacher;
            }
        }

        public Teacher AddTeacher(Teacher teacherToAdd)
        {
            var sql = @"INSERT INTO Teacher(schoolId, FirstName, LastName, UserName, Pin)
                        OUTPUT INSERTED.*
                        VALUES (@SchoolId, @FirstName, @LastName, @UserName, @Pin)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Teacher>(sql, teacherToAdd);

                return result;
            }
        }

        public Teacher UpdateTeacher(int teacherId, Teacher updatedTeacher)
        {
            var sql = @"UPDATE Teacher
                        SET FirstName = @FirstName, LastName = @LastName, UserName = @UserName, Pin = @Pin
                        OUTPUT INSERTED.*
                        WHERE TeacherId = @teacherId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    updatedTeacher.FirstName,
                    updatedTeacher.LastName,
                    updatedTeacher.UserName,
                    updatedTeacher.Pin,
                    TeacherId = teacherId,
                };

                var result = db.QueryFirstOrDefault<Teacher>(sql, parameters);
                return result;
            }
        }

        public string DeleteTeacher(int teacherId)
        {
            var sql = @"DELETE
                        FROM Teacher
                        WHERE TeacherId = @teacherId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { TeacherId = teacherId });

                return ($"Successfully deleted teacher with Id #:{teacherId}");
            }
        }
    }
}
