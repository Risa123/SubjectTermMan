const subjectDao = require("../dao");
const userDao = require("../../user/dao");
const {log} = require("../../common");

module.exports = async request =>{
    const user = (await userDao.get({authToken:request.authToken})).name;
    const subject = await subjectDao.get({_id:request.subjectID});
    log(user,`subject ${subject.name}`);
    return subject;
};