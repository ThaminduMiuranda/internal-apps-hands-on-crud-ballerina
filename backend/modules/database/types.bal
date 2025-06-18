// import ballerina/sql;
// import ballerinax/mysql;
import ballerina/http;
import ballerina/time;

type DatabaseConfig record {|
    string user;
    string password;
    string database;
    string host;
    int port;
|};

public type User record {|
    readonly int id;
    string name;
    string email;
    string role;
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


