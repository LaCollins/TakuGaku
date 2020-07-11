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
    }
}
