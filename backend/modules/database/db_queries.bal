import ballerina/sql;

isolated function retrieveAllUsers() returns sql:ParameterizedQuery{
    sql:ParameterizedQuery query = `SELECT * FROM users`;
    return query;
}

isolated function retrieveUserById(int id) returns sql:ParameterizedQuery{
    sql:ParameterizedQuery query = `SELECT * FROM users WHERE id = ${id}`;
    return query; 
}
