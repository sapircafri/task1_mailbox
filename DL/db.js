const sqlite3 = require('sqlite3').verbose();

async function connect() {
    try {
   await new sqlite3.Database('../mailbox.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    }
    catch (error) {
        console.log(error);
        throw error
    }

}
// connect()
module.exports = {connect}

