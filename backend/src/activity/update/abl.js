const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const {update} = require("../dao");

module.exports = async request =>{
   const user = await checkRole(request.authToken,ROLE_ADMIN);
   const updateData = {"$set":{}};
   for(const entry of Object.entries(request)){
      const name = entry[0];
      if(name != "authToken" && name != "subjectID"){
         updateData["$set"][name] = entry[1];
      }
   }
   await update(request.activityID,updateData);
   console.log(`activity updated by user ${user}`);
};