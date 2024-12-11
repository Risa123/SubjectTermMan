const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const activityDao = require("../dao");
const subjectTermDao = require("../../subjectTerm/dao");

module.exports = async request =>{
   const user = await checkRole(request.authToken,ROLE_ADMIN);
   await activityDao.remove(request.activity);
   await subjectTermDao.update(request.subjectTerm,{"$pull":{activities:request.activity}});
   console.log(`activity ${request.activity} removed by user ${user}`);
};