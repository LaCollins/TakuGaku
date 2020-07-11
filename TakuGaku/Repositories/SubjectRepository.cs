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
    public class SubjectRepository
    {
        string ConnectionString;

        public SubjectRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("TakuGaku");
        }

        public IEnumerable<Subject> GetAllSubjects()
        {
            var sql = @"SELECT *
                        FROM [Subject]";

            using (var db = new SqlConnection(ConnectionString))
            {
                var subjects = db.Query<Subject>(sql);

                return subjects;
            }
        }

        public Subject GetSubjectById(int subjectId)
        {
            var sql = @"SELECT *
                        FROM [Subject]
                        WHERE SubjectId = @subjectId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var subject = db.QueryFirstOrDefault<Subject>(sql, new { SubjectId = subjectId });

                return subject;
            }
        }

        public Subject GetSubjectByType(string subjectType)
        {
            var sql = @"SELECT *
                        FROM [Subject]
                        WHERE SubjectType = @subjectType";

            using (var db = new SqlConnection(ConnectionString))
            {
                var subject = db.QueryFirstOrDefault<Subject>(sql, new { SubjectType = subjectType });

                return subject;
            }
        }

        public Subject AddSubject(Subject subjectToAdd)
        {
            var sql = @"INSERT INTO [Subject](SubjectType)
                        OUTPUT INSERTED.*
                        VALUES (@subjectType)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Subject>(sql, subjectToAdd);

                return result;
            }
        }

        public string DeleteSubject(int subjectId)
        {
            var sql = @"DELETE
                        FROM [Subject]
                        WHERE SubjectId = @subjectId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { SubjectId = subjectId });

                return ($"Successfully deleted subject with Id #:{subjectId}");
            }
        }
    }
}
