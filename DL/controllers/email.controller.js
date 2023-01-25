const sqlite3 = require('sqlite3').verbose();
//  require ('../db').connect();
 const db =  new sqlite3.Database('./mailbox.db')

async function create(data) {
    return await db.run(data)
}

async function read(sql) {
    return new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
  
async function update(sql) {
    return await db.run(sql)
}
async function del(sql) {
    return await db.run(sql)
}


module.exports = { create, read, update, del }