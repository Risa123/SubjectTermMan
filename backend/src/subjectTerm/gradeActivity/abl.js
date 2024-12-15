const {update} = require("../dao");
const {checkRole,ROLE_TEACHER} = require("../../user/dao");
const {log} = require("../../common");

module.exports = async request =>{
    const user = await checkRole(request.authToken,ROLE_TEACHER);
    await update(request.subjectTerm,{"$set":{["evaluation." + request.activity + "." + request.student]:request.points}});
    log(user,`student ${request.student} was given ${request.points} for ${request.activity}`);
};