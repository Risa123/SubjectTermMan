const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const {create} = require("../dao");

module.exports = async request =>{
   const user = await checkRole(request.authToken,ROLE_ADMIN);
   const activity = {
      _id:crypto.randomUUID(),
      name:request.name,
      term:request.term,
      points:request.points,
      assigment:request.assigment
   };
   await create(activity);
   console.log(`activity created ${JSON.stringify(activity)} by user ${user}`);
   return activity;
};