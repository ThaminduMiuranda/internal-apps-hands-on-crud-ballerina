import ballerina/sql;
import ballerina/time;

public isolated function users() returns User[]|error {
    stream<User, sql:Error?> userStream = LearningPortalDb->query(retrieveAllUsers());
    return from var user in userStream
        select user;
}

public isolated function userById(int id) returns User|UserNotFound|error {
    User|sql:Error result = LearningPortalDb->queryRow(retrieveUserById(id));

    if result is sql:NoRowsError {
        UserNotFound userNotFound = {body: {message: string `id: ${id}`, details: string `users/${id}`, timeStamp: time:utcNow()}};
        return userNotFound;
    }
    return result;
}