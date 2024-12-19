const subjectTermDao = require("../dao");
const userDao = require("../../user/dao");

module.exports = async request =>{
    const user = await userDao.get({authToken:request.authToken});
    const subjectTerm = await subjectTermDao.get({_id:request.subjectTerm});
    return subjectTerm;
};