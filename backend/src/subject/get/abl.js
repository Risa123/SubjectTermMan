const subjectDao = require("../dao");
const userDao = require("../../user/dao");

module.exports = async request =>{
    await userDao.get({authToken:request.authToken});
    return await subjectDao.get({_id:request.subjectID});
}