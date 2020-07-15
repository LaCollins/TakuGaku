﻿using Dapper;
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
            var sql = @"INSERT INTO assignment(studentId, classId, assignmentTypeId, subjectId, instructions, completed, grade, dateAssigned, dateDue, dateComplete, assignmentTitle)
                        OUTPUT INSERTED.*
                        VALUES (@studentId, @classId, @assignmentTypeId, @subjectId, @instructions, @completed, @grade, @dateAssigned, @dateDue, @dateComplete, @assignmentTitle)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Assignment>(sql, assignmentToAdd);

                return result;
            }
        }

        public Assignment UpdateAssignment(int assignmentId, Assignment updatedAssignment)
        {
            var sql = @"UPDATE assignment
                        SET StudentId = @studentId, ClassId = @classId, AssignmentTypeId = @assignmentTypeId,
                            SubjectId = @subjectId, Instructions = @instructions, Completed = @completed, Grade = @grade,
                            DateAssigned = @dateAssigned, DateDue = @dateDue, DateComplete = @dateComplete, AssignmentTitle = @assignmentTitle
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
    }
}