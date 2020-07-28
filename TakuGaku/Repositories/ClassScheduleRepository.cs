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
    public class ClassScheduleRepository
    {
        string ConnectionString;

        public ClassScheduleRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("TakuGaku");
        }

        public IEnumerable<ClassSchedule> GetAllClasses()
        {
            var sql = @"SELECT *
                        FROM ClassSchedule";

            using (var db = new SqlConnection(ConnectionString))
            {
                var classes = db.Query<ClassSchedule>(sql);

                return classes;
            }
        }

        public IEnumerable<ClassSchedule> GetClassByStudent(int studentId)
        {
            var sql = @"SELECT *
                        FROM ClassSchedule
                        WHERE StudentId = @studentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var classes = db.Query<ClassSchedule>(sql, new { StudentId = studentId });

                return classes;
            }
        }

        public IEnumerable<ClassSchedule> GetClassBySubject(int subjectId)
        {
            var sql = @"SELECT *
                        FROM ClassSchedule
                        WHERE SubjectId = @subjectId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var classes = db.Query<ClassSchedule>(sql, new { SubjectId = subjectId });

                return classes;
            }
        }

        public bool CheckExistingClass(ClassSchedule classToAdd)
        {
            var classes = GetClassByStudent(classToAdd.StudentId);
            var classExists = false;

            if (classes.Any())
            {
                foreach (var classItem in classes)
                {
                    if (classItem.DayOfWeek == classToAdd.DayOfWeek 
                        && classItem.TimeSlot == classToAdd.TimeSlot 
                        && classItem.SubjectId == classToAdd.SubjectId)
                    {
                        classExists = true;
                    }
                }
            }

            return classExists;
        }

        public bool CheckOpenTimeslot(ClassSchedule classToAdd, int classId)
        {
            var classes = GetClassByStudent(classToAdd.StudentId);
            var timeSlotOpen = true;

            if (classes.Any())
            {
                foreach (var classItem in classes)
                {
                    if (classItem.DayOfWeek == classToAdd.DayOfWeek
                        && classItem.TimeSlot == classToAdd.TimeSlot
                        && classItem.ClassId != classId)
                    { 
                            timeSlotOpen = false;
                    }
                }
            }

            return timeSlotOpen;
        }

        public ClassSchedule AddClass(ClassSchedule classToAdd)
        {
            var sql = @"INSERT INTO ClassSchedule(studentId, subjectId, [dayOfWeek], timeSlot, classTitle)
                        OUTPUT INSERTED.*
                        VALUES (@studentId, @subjectId, @dayOfWeek, @timeSlot, @classTitle)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<ClassSchedule>(sql, classToAdd);

                return result;
            }
        }

        public ClassSchedule UpdateClass(int classId, ClassSchedule updatedClass)
        {
            var sql = @"UPDATE classSchedule
                        SET StudentId = @studentId, SubjectId = @subjectId, [dayOfWeek] = @dayOfWeek, TimeSlot = @timeslot, ClassTitle = @classTitle
                        OUTPUT INSERTED.*
                        WHERE ClassId = @classId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    updatedClass.StudentId,
                    updatedClass.SubjectId,
                    updatedClass.DayOfWeek,
                    updatedClass.TimeSlot,
                    updatedClass.ClassTitle,
                    ClassId = classId,
                };

                var result = db.QueryFirstOrDefault<ClassSchedule>(sql, parameters);
                return result;
            }
        }

        public string DeleteClass(int classId)
        {
            var sql = @"DELETE
                        FROM ClassSchedule
                        WHERE ClassId = @classId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { ClassId = classId });

                return ($"Successfully deleted class with Id #:{classId}");
            }
        }

        public string DeleteClassByStudentId(int studentId)
        {
            var sql = @"DELETE
                        FROM ClassSchedule
                        WHERE StudentId = @studentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { StudentId = studentId });

                return ($"Successfully deleted class with studentId #:{studentId}");
            }
        }
    }
}
