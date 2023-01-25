const emailDL = require('../DL/controllers/email.controller');

async function createNewEmail(newEmail) {

    let sql = `INSERT INTO "email"
            ("id","sender_id","receiver_id", "content", "is_read","chat_id")
             VALUES  (${newEmail.id},"${newEmail.sender_id}","${newEmail.receiver_id}", "${newEmail.content}", "${newEmail.is_read}","${newEmail.chat_id}")`

    if (!newEmail.id || !newEmail.sender_id || !newEmail.receiver_id || !newEmail.content ){
     throw {message:"missing data"}
    }    
    let res = await emailDL.create(sql);
    return res;
}

async function findEmail(id) {
    let sql = `SELECT * FROM email WHERE id=${id}`
    let res = await emailDL.read(sql);
    if (res.length>0){
        return res;
    } else{
        throw {message:"email not found"}
    }
}

async function getIncomingEmailsOfUser(user) {
    let sql = `SELECT * FROM email WHERE receiver_id=${user.id}`
    let res = await emailDL.read(sql);
    return res;
}

async function getFavoriteEmail(user) {
    let sql = `SELECT * FROM email WHERE receiver_id=${user.id} AND favorite=true`
    let res = await emailDL.read(sql);
    return res;
}

async function updateEmail(emailToUpdate) {
    const email = await findEmail(emailToUpdate.id);
    if (email) {
        let sql = `UPDATE email
        SET ${emailToUpdate.field} = ${emailToUpdate.newData}
        WHERE id = ${emailToUpdate.id}`

        return await emailDL.update(sql);
    }
    else throw {message:"email not exist"}
}

async function deleteEmail(emailToDelete) {
    const email = findEmail(emailToDelete.id);
    if (email) {
        let sql = `DELETE FROM email
        WHERE id = ${emailToDelete.id}`
        let result = await emailDL.del(sql);
        return result;
    }
}


module.exports = { createNewEmail,getIncomingEmailsOfUser,getFavoriteEmail,updateEmail,deleteEmail}