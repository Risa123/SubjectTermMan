const subjectTermDao = require("../dao");
const userDao = require("../../user/dao");
const {log} = require("../../common");

module.exports = async request =>{
    const user = await userDao.get({authToken:request.authToken});
    const subjectTerm = await subjectTermDao.get({_id:request.subjectTerm});
    log(user,`subjectTerm ${subjectTerm.name} accessed`);
    return subjectTerm;
};