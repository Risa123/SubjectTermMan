const {create} = require("../dao");
const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const {log} = require("../../common");

module.exports = async request =>{
  const user = await checkRole(request.authToken,ROLE_ADMIN);
  const subject = {
    _id:crypto.randomUUID(),
    name:request.name,
    info:request.info,
    credits:request.credits
  };
  await create(subject);
  log(user,`created subject ${JSON.stringify(subject)}`);
  return subject;
}