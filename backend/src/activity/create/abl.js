const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const activityDao = require("../dao");
const subjectTermDao = require("../../subjectTerm/dao");

module.exports = async request =>{
   const user = await checkRole(request.authToken,ROLE_ADMIN);
   const activity = {
      _id:crypto.randomUUID(),
      name:request.name,
      term:request.term,
      points:request.points,
      assigment:request.assigment
   };
   await activityDao.create(activity);
   await subjectTermDao.update(request.subjectTerm,{"$push":{activities:activity._id}})
   log(user,`activity created ${JSON.stringify(activity)}`);
   return activity;
};