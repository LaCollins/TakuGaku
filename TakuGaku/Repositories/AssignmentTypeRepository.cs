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
    public class AssignmentTypeRepository
    {
        string ConnectionString;

        public AssignmentTypeRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("TakuGaku");
        }

        public IEnumerable<AssignmentTypeModel> GetAllAssignmentTypes()
        {
            var sql = @"SELECT *
                        FROM AssignmentType";

            using (var db = new SqlConnection(ConnectionString))
            {
                var assignmentTypes = db.Query<AssignmentTypeModel>(sql);

                return assignmentTypes;
            }
        }

        public AssignmentTypeModel GetAssignmentTypeById(int assignmentTypeId)
        {
            var sql = @"SELECT *
                        FROM AssignmentType
                        WHERE AssignmentTypeId = @assignmentTypeId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var assignmentType = db.QueryFirstOrDefault<AssignmentTypeModel>(sql, new { AssignmentTypeId = assignmentTypeId });

                return assignmentType;
            }
        }

        public AssignmentTypeModel GetAssignmentTypeByType(string assignmentType)
        {
            var sql = @"SELECT *
                        FROM AssignmentType
                        WHERE AssignmentType = @assignmentType";

            using (var db = new SqlConnection(ConnectionString))
            {
                var assignmentByType = db.QueryFirstOrDefault<AssignmentTypeModel>(sql, new { assignmentType = assignmentType });

                return assignmentByType;
            }
        }

        public AssignmentTypeModel AddAssignmentType(AssignmentTypeModel assignmentTypeToAdd)
        {
            var sql = @"INSERT INTO AssignmentType(assignmentType)
                        OUTPUT INSERTED.*
                        VALUES (@assignmentType)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<AssignmentTypeModel>(sql, assignmentTypeToAdd);

                return result;
            }
        }

        public string DeleteAssignmentType(int assignmentTypeId)
        {
            var sql = @"DELETE
                        FROM AssignmentType
                        WHERE AssignmentTypeId = @assignmentTypeId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { AssignmentTypeId = assignmentTypeId });

                return ($"Successfully deleted assignment type with Id #:{assignmentTypeId}");
            }
        }
    }
}
