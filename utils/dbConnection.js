const mysql = require('mysql2');
//database connection
const dbConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tws'
});
dbConnection.getConnection(function(err,dbConnection){
    if(err){
        return console.log("Database not connected",err.message);
    }
    console.log("Database Connected :)");
})
module.exports = dbConnection.promise();