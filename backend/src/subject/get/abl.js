const subjectDao = require("../dao");
const userDao = require("../../user/dao");

module.exports = async request =>{
    await userDao.get({authToken:request.authToken});
    const subject = await subjectDao.get({_id:request.subjectID});
    return subject;
};