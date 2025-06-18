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

isolated function putUser(int id, NewUser updatedUser) returns sql:ParameterizedQuery {
    sql:ParameterizedQuery query = `UPDATE users SET name = ${updatedUser.name}, email = ${updatedUser.email}, role = ${updatedUser.role}, phone = ${updatedUser.phone} WHERE id = ${id}`;
    return query;
}
