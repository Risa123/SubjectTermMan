const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const activityDao = require("../dao");
const subjectTermDao = require("../../subjectTerm/dao");
const {log} = require("../../common");

module.exports = async request =>{
   const user = await checkRole(request.authToken,ROLE_ADMIN);
   await activityDao.remove(request.activity);
   await subjectTermDao.update(request.subjectTerm,{"$pull":{activities:request.activity}});
   log(user,`activity removed ${request.activity}`);
};