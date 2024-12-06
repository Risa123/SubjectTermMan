const {create} = require("../dao");
const {checkRole,ROLE_ADMIN} = require("../../user/dao");

module.exports = async request =>{
  const user = await checkRole(request.authToken,ROLE_ADMIN);
  const subject = {
    _id:crypto.randomUUID(),
    name:request.name,
    info:request.info,
    credits:request.credits
  };
  await create(subject);
  console.log(`subject created ${JSON.stringify(subject)} by user ${user}`);
}