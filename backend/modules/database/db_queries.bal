import ballerina/sql;

isolated function retrieveAllUsers() returns sql:ParameterizedQuery {
    sql:ParameterizedQuery query = `SELECT * FROM users`;
    return query;
}

isolated function retrieveUserById(int id) returns sql:ParameterizedQuery {
    sql:ParameterizedQuery query = `SELECT * FROM users WHERE id = ${id}`;
    return query;
}

isolated function postUser(NewUser newUser) returns sql:ParameterizedQuery {
    sql:ParameterizedQuery query = `INSERT INTO users (name, email, role, phone) VALUES (${newUser.name}, ${newUser.email}, ${newUser.role}, ${newUser.phone})`;
    return query;
}
