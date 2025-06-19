import ballerina/http;
import ballerina/sql;
import ballerina/time;

public isolated function users() returns User[]|error {
    stream<User, sql:Error?> userStream = LearningPortalDb->query(retrieveAllUsers());

    User[] userList = [];

    check from var user in userStream
        do {
            Role|error role = <Role>user.role;
            if role is error {
                return error("Invalid role value from DB: " + user.role);
            }

            userList.push({
                id: user.id,
                name: user.name,
                email: user.email,
                role: role,
                phone: user.phone
            });

        };

    return userList;
}

public isolated function userById(int id) returns User|UserNotFound|error {
    User|sql:Error result = LearningPortalDb->queryRow(retrieveUserById(id));

    if result is sql:NoRowsError {
        UserNotFound userNotFound = {body: {message: string `id: ${id}`, details: string `users/${id}`, timeStamp: time:utcNow()}};
        return userNotFound;
    }
    return result;
}

public isolated function insertUser(NewUser newUser) returns http:Created|error {
    _ = check LearningPortalDb->execute(postUser(newUser));

    return http:CREATED;
}

public isolated function updateUser(int id, NewUser updatedUser) returns http:Ok|error {
    _ = check LearningPortalDb->execute(putUser(id, updatedUser));

    return http:OK;
}

public isolated function deleteUser(int id) returns http:Ok|error {
    _ = check LearningPortalDb->execute(deleUser(id));
    return http:OK;
}

public isolated function searchUsers(string name, string role) returns User[]|error {
    stream<User, sql:Error?> userStream = LearningPortalDb->query(search(name, role));

    User[] userList = [];

    check from var user in userStream
        do {
            userList.push(user);
        };

    return userList;
}
