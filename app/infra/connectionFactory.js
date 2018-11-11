var mysql  = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'agencia_turismo'
    });
}

module.exports = function() {
    return createDBConnection;
}