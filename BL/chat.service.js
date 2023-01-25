const chatDL = require('../DL/controllers/chat.controller');

async function createNewChat(newChat) {

    let sql = `INSERT INTO "chat"
            ("id")
             VALUES  (${newChat.chat_id})`
    let sql2 = `INSERT INTO "chat_email"
            ("chat_id","email_id")
             VALUES (${newChat.chat_id},${newChat.OriginalEmail_id}),
                    (${newChat.chat_id},${newChat.responseEmail_id})`

    if (!newChat.chat_id || !newChat.OriginalEmail_id || !newChat.responseEmail_id ){
     throw {message:"missing data"}
    }    
    let res = await chatDL.create(sql);
    let res2 = await chatDL.create(sql2);

    return res,res2;
}

async function findChat(chat_id) {
    let sql = `SELECT * 
    FROM email em, chat_email chEm
    WHERE chEm.chat_id=${chat_id} AND em.id = chEm.email_id`
    let res = await chatDL.read(sql);
    if (res.length>0){
        return res;
    } else{
        throw {message:"chat not found"}
    }
}

async function updateChat(chatToUpdate) {
    const chat = await findChat(chatToUpdate.chat_id);
    if (chat) {
        let sql = `INSERT INTO "chat_email"
            ("chat_id","email_id")
             VALUES (${chatToUpdate.chat_id},${chatToUpdate.email_id})`

        return await chatDL.update(sql);
    }
    else throw {message:"email not exist"}
}

async function deleteChat(chatToDelete) {
    const chat = findChat(chatToDelete.chat_id);
    if (chat) {
        let sql = `DELETE FROM chat
        WHERE id = ${chatToDelete.chat_id}`
        let sql2 = `DELETE FROM chat_email
        WHERE chat_id = ${chatToDelete.chat_id}`
        let result = await chatDL.del(sql);
        let result2 = await chatDL.del(sql2);

        return result, result2;
    }
}


module.exports = { createNewChat,findChat,updateChat,deleteChat}