const {update} = require("../dao");
const {checkRole,ROLE_TEACHER} = require("../../user/dao");

module.exports = async request =>{
    const user = await checkRole(request.authToken,ROLE_TEACHER);
    await update(request.subjectTerm,{"$set":{["evaluation." + request.activity + "." + request.student]:request.points}});
    console.log(`student ${request.student} was given ${request.points} for ${request.activity} by ${user.name}`);
};