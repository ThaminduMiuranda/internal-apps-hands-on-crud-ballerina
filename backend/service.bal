import backend.database;
import ballerina/http;
// import ballerina/sql;

service /learning\-portal on new http:Listener(9090) {

    resource function get users(http:RequestContext ctx)  returns User[]|error {

        database:User[]|error users = database:users();
        
        return users;
    }

    resource function get users/[int id](http:RequestContext ctx) returns User|database:UserNotFound|error {
        database:User|database:UserNotFound|error user = database:userById(id);
        return user;
    }
}
