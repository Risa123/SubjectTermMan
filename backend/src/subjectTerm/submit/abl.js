const {update} = require("../dao"); 
const userDao = require("../../user/dao");

module.exports = async (request) => {
    const user = await userDao.checkRole(request.authToken,userDao.ROLE_STUDENT);
    await update(request.subjectTerm,{"$set":{["evaluation." + request.activity + "." + request.student]:request.solution}});
}