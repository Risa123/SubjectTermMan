const {update} = require("../dao"); 
const userDao = require("../../user/dao");
const {log} = require("../../common");

module.exports = async (request) => {
    const user = await userDao.checkRole(request.authToken,userDao.ROLE_STUDENT);
    log(user, `solution for activity ${request.activity} submited`);
    await update(request.subjectTerm,{"$set":{["evaluation." + request.activity + "." + user._id]:request.solution}});
}