const {update,get} = require("../dao");
const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const {log} = require("../../common");

module.exports = async request =>{
  const user = await checkRole(request.authToken,ROLE_ADMIN);
  const updateData = {"$set":{}};
  for(const entry of Object.entries(request)){
     const name = entry[0];
     if(name != "authToken" && name != "subjectID"){
        updateData["$set"][name] = entry[1];
     }
  }
  await update(request.subjectID,updateData);
  const subject = await get({_id:request.subjectID})
  log(user,`subject ${JSON.stringify(subject)} changed`);
  return subject;
}