// import ballerina/sql;
// import ballerinax/mysql;

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



