import ballerina/sql;

public isolated  function users() returns User[]|error {
    stream<User, sql:Error?> userStream = LearningPortalDb->query(retrieveAllUsers());
    return from var user in userStream
        select user;
}