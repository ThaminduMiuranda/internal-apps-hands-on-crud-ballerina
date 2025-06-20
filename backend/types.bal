import ballerina/constraint;
import ballerina/http;
import ballerina/time;

type Role "student"|"instructor"|"admin";

type User record {|
    readonly int id;
    string name;
    string email;
    string role;
    string phone;
|};

type NewUser record {|
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
    @constraint:String {
        pattern: re `^(\+94|0)[0-9]{9}$`
    }
    string phone;
|};

type ErrorDetails record {|
    string message;
    string? details;
    time:Utc timeStamp = time:utcNow();
|};

type UserNotFound record {|
    *http:NotFound;
    ErrorDetails body;
|};

type InvalidInput record {|
    *http:BadRequest;
    ErrorDetails body;
|};

type InternalServerError record {|
    *http:InternalServerError;
    ErrorDetails body;
|};

type DeleteFailed record {|
    *http:BadRequest;
    ErrorDetails body;
|};

//conflict error is for any duplicate value like emails. 
type ConflictError record {|
    *http:Conflict;
    ErrorDetails body;
|};

