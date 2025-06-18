import ballerina/sql;

isolated function retrieveAllUsers() returns sql:ParameterizedQuery{
    sql:ParameterizedQuery query = `SELECT * FROM users`;
    return query;
}


