const userDL = require('../DL/controllers/user.controller');

async function findUserBeforeCreate(id){
    let sql = `SELECT * FROM User WHERE id=${id}`
    let res = await userDL.read(sql);
    if (res){
        return res;
    }
}
async function createNewUser(newUser) {

    let sql = `INSERT INTO "User"
            ("id","fname","lname", "email", "password")
             VALUES  (${newUser.id},"${newUser.fname}","${newUser.lname}", "${newUser.email}", "${newUser.password}")`

    if (!newUser.email || !newUser.password || !newUser.fname || !newUser.lname || !newUser.id){
     throw {message:"missing data"}
    }    
    let user = await findUserBeforeCreate(newUser.id);
    if (user.length>0) throw {message:"user is exist"}
    let res = await userDL.create(sql);
    return res;
}

async function findUser(id) {
    let sql = `SELECT * FROM User WHERE id=${id}`
    let res = await userDL.read(sql);
    if (res.length>0){
        return res;
    } else{
        throw {message:"user not found"}
    }
}
async function getAllUsers() {
    let sql = `SELECT * FROM User`
    let res = await userDL.read(sql);
    return res;
}


async function updateUser(userToUpdate) {
    const user = await findUser(userToUpdate.id);
    if (user) {
        let sql = `UPDATE User
        SET "${userToUpdate.field}" = ${userToUpdate.newData}
        WHERE id = ${userToUpdate.id}`
        let result = await userDL.update(sql);
        return result;
    }
    else throw {message:"user not exist"}
}

async function deleteUser(userToDelete) {
    const user = findUser(userToDelete.id);
    if (user) {
        let sql = `UPDATE User
        SET isActive = false
        WHERE id = ${userToDelete.id}`
        let result = await userDL.update(sql);
        return result;
    }
}


module.exports = { createNewUser, findUser, getAllUsers, updateUser, deleteUser }