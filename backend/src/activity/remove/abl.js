const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const {remove} = require("../dao");

module.exports = async request =>{
   const user = await checkRole(request.authToken,ROLE_ADMIN);
   await remove(request.activityID);
   console.log(`activity removed by user ${user}`);
};