const subjectDao = require("../dao");
const userDao = require("../../user/dao");

module.exports = async request =>{
    const user = (await userDao.get({authToken:request.authToken})).name;
    const subject = await subjectDao.get({_id:request.subjectID});
    console.log(`subject ${subject.name} accessed by user ${user}`);
    return subject;
};