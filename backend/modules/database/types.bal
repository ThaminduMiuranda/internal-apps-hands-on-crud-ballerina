// import ballerina/sql;
// import ballerinax/mysql;
import ballerina/http;
import ballerina/time;
import ballerina/constraint;

type DatabaseConfig record {|
    string user;
    string password;
    string database;
    string host;
    int port;
|};

public type Role "student" | "instructor" | "admin";

public type User record {|
    readonly int id;
    string name;
    string email;
    string role;
    string phone;
|};

public type NewUser record {|
    @constraint:String {
        minLength: 1,
        maxLength: 100
    }
    string name;
    @constraint:String {
        pattern: re `^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`
    }
    string email;
    string role;
    @constraint:String{
        pattern: re `^(\+94|0)[0-9]{9}$`
    }
    string phone;
|};

public type ErrorDetails record {|
    string message;
    string details;
    time:Utc timeStamp;
|};

public type UserNotFound record {|
    *http:NotFound;
    ErrorDetails body;
|};


