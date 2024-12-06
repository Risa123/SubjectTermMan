const {create} = require("../dao")
const {checkRole,ROLE_ADMIN} = require("../../user/dao")

module.exports = async request =>{
  await checkRole(request.authToken,ROLE_ADMIN);
  await create({
    _id:crypto.randomUUID(),
    name:request.name,
    info:request.info,
    credits:request.credits
  })
}