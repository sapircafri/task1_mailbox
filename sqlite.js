// import  sqlite3  from "sqlite3";
// import { open } from "sqlite";

// export async function opedDb(){
//     return open({
//     filename :'mailbox.db',
//     driver: sqlite3.Database
// })
// }

const sqlite3 = require('sqlite3').verbose();
let sql;
const db = new sqlite3.Database('./mailbox.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

// sql = `CREATE TABLE tset (id INTEGER)`
// db.run(sql);

db.all('SELECT * FROM User', [], (err, rows)=>{
    if(err) {throw err}
    console.log(rows);
})