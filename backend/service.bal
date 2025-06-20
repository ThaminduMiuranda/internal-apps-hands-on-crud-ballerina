import backend.database;

import ballerina/http;
import ballerina/sql;

// import ballerina/sql;

// listener http:Listener userApiEP = new(9090);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000", "http://localhost:5173"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type"],
        allowCredentials: false
    }
}

service /learning\-portal on new http:Listener(9090) {

    resource function get users(http:RequestContext ctx) returns User[]|InternalServerError|error {

        User[]|error result = database:users();

        if result is error {
            return {
                body: {
                    message: "Internal Server Error",
                    details: result.message()
                }
            };
        }
        return result;
    }

    resource function get users/[int id](http:RequestContext ctx) returns User|UserNotFound|InternalServerError|error {
        User|error result = database:userById(id);

        UserNotFound userNotFound = {
            body: {
                message: "User not found",
                details: string `User with id: ${id} doesn't exists`
            }
        };

        InternalServerError internalServerError = {
            body: {
                message: "Internal Server Error",
                details: ()
            }
        };

        if result is sql:NoRowsError {
            return userNotFound;
        } else if result is error {
            return internalServerError;
        }
        return result;
    }

    resource function post users(http:RequestContext ctx, NewUser newUser) returns http:Created|InvalidInput|ConflictError|InternalServerError|error {
        error? result = database:insertUser(newUser);

        if result is error {
            string errMsg = result.message();

            ConflictError conflictError = {body: {
                    message: "Conflict",
                    details: "A user with the same email already exists"
                }};

            InvalidInput invalidInput = {body: {
                    message: "Invalid Input",
                    details: errMsg
                }};

            if string:includes(errMsg, "Duplicates") || string:includes(errMsg, "duplicate") {
                return conflictError;
            }

            return invalidInput;
        }

        return {
            body: {
                status: http:STATUS_CREATED,
                body: {
                    message: "User created successfully"
                }
            }
        };
    }

    resource function put users/[int id](http:RequestContext ctx, NewUser updatedUser) returns http:Ok|InvalidInput|ConflictError|InternalServerError|error {

        error? result = database:updateUser(id, updatedUser);

        if result is error {
            string errMsg = result.message();

            ConflictError conflictError = {body: {
                    message: "Conflict",
                    details: "A user with the same email already exists"
                }};

            InvalidInput invalidInput = {body: {
                    message: "Invalid Input",
                    details: errMsg
                }};

            if string:includes(errMsg, "Duplicates") || string:includes(errMsg, "duplicate") {
                return conflictError;
            }

            return invalidInput;
        }

        return {
            body: {
                status: http:STATUS_OK,
                body: {
                    message: "User created successfully"
                }
            }
        };
    }

    resource function delete users/[int id](http:RequestContext ctx) returns http:Ok|InvalidInput|InternalServerError|error {
        error? result = database:deleteUser(id);

        if result is error {
            DeleteFailed deleteFailed = {
                body: {
                    message: "Delete Failed",
                    details: result.message()
                }
            };

            return deleteFailed;
        }

        return {
            body: {
                status: http:STATUS_OK,
                body: {
                    message: "User deleted successfully"
                }
            }
        };
    }

    resource function get users/user(http:RequestContext ctx, string name, string role) returns User[]|UserNotFound|InternalServerError|error {

        User[]|error result = database:searchUsers(name, role);

        if result is sql:NoRowsError {
            UserNotFound userNotFound = {body: {message: "User not found", details: string `User with serched name doesn't exist`}};
            return userNotFound;
        }

        if result is error {
            InternalServerError internalServerError = {body: {message: "Internal Server Error", details: result.message()}};
            return internalServerError;
        }

        return result;
    }
}
