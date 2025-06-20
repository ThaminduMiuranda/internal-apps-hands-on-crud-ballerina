import ballerina/sql;

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

public isolated function userById(int id) returns User|error {
    User|sql:Error result = LearningPortalDb->queryRow(retrieveUserById(id));
    return result;
}

public isolated function insertUser(NewUser newUser) returns error? {
    sql:ExecutionResult|sql:Error result = LearningPortalDb->execute(postUser(newUser));
    if result is sql:Error {
        return error(string `Failed to insert user: ${result.message()}`);
    }
    return;
}

public isolated function updateUser(int id, NewUser updatedUser) returns error? {
    sql:ExecutionResult|sql:Error result = LearningPortalDb->execute(putUser(id, updatedUser));
    if result is sql:Error {
        return error(string `Failed to update user with id: ${id}: ${result.message()}`);
    }

    return;
}

public isolated function deleteUser(int id) returns error? {
    sql:ExecutionResult|sql:Error result = LearningPortalDb->execute(deleUser(id));
    if result is sql:Error {
        return error(string `Failed to delete user with id: ${id}: ${result.message()}`);
    }
    return;
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
