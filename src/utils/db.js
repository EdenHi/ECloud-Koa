const mysql = require('mysql')
const pool = mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'ECloud'
})
const query = (sql,callback)=>{
    pool.getConnection(function(err,connection){
        connection.query(sql,function(err,rows){
            callback(err,rows)
            connection.release()
        })
    })
}
exports.query = query;