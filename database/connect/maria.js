const maria = require("mysql");

const conn = maria.createConnection({
    host: '54.180.145.113',
    port: 8000,
    user: 'stageus',
    password: '1234',
    database: '7weekhomework'
});

module.exports = conn;