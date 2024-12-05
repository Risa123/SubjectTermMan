const subjectDao = require("../dao");
const userDao = require("../../user/dao");

module.exports = async request =>{
    await userDao.get(request.userName);
    return await subjectDao.get(request.subjectID);
}