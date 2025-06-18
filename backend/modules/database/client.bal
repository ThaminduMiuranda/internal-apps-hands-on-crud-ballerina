import ballerinax/mysql;
import ballerinax/mysql.driver as _;

configurable DatabaseConfig databaseConfig = ?;

function initLearningPortalDbClient() returns mysql:Client|error => new(...databaseConfig);

final mysql:Client LearningPortalDb = check initLearningPortalDbClient();

