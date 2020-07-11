using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using TakuGaku.Models;
using Dapper;

namespace TakuGaku.Repositories
{
    public class SchoolRepository
    {
        string ConnectionString;

        public SchoolRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("TakuGaku");
        }

        public IEnumerable<School> GetAllSchools()
        {
            var sql = @"SELECT *
                        FROM School";

            using (var db = new SqlConnection(ConnectionString))
            {
                var schools = db.Query<School>(sql);

                return schools;
            }
        }

        public School GetSchoolById(int schoolId)
        {
            var sql = @"SELECT *
                        FROM School
                        WHERE SchoolId = @schoolId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var school = db.QueryFirstOrDefault<School>(sql, new { SchoolId = schoolId });

                return school;
            }
        }
    }
}
