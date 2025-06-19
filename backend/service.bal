import backend.database;

import ballerina/http;

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

    resource function get users(http:RequestContext ctx) returns database:User[]|error {

        database:User[]|error allUsers = database:users();

        return allUsers;
    }

    resource function get users/[int id](http:RequestContext ctx) returns database:User|database:UserNotFound|error {
        database:User|database:UserNotFound|error user = database:userById(id);
        return user;
    }

    resource function post users(http:RequestContext ctx, database:NewUser newUser) returns http:Created|error {
        return database:insertUser(newUser);
    }

    resource function put users/[int id](http:RequestContext ctx, database:NewUser updatedUser) returns http:Ok|error {
        return database:updateUser(id, updatedUser);
    }

    resource function delete users/[int id](http:RequestContext ctx) returns http:Ok|error {
        return database:deleteUser(id);
    }

    resource function get users/user(http:RequestContext ctx, string name, string role) returns database:User[]|error {

        database:User[]|error allUsers = database:searchUsers(name, role);

        return allUsers;
    }
}
