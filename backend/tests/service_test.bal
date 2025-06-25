import ballerina/http;
import ballerina/test;
// import ballerinax/mysql;

// import backend.database;

http:Client LearningPortalDb = check new("http://localhost:9090/learning-portal/");

@test:Config
function testGetUsers() returns error? {
    User[] usersExpected = [
        {id: 1, name: "Alice Perera", email: "alice@example.com", role: "student", phone: "+94711234567"},
        {id: 2, name: "Bob Silva", email: "bob@example.com", role: "instructor", phone: "+94779876543"}
    ];
    test:prepare(LearningPortalDb).when("query").thenReturn(usersExpected);

    http:Client learningPortalEndpoint = check new("http://localhost:9090/learning-portal");
    User[] usersActual = check learningPortalEndpoint->/users;

    test:assertEquals(usersActual, usersExpected, msg = "Users list should match expected values");
}