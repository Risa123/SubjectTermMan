const {remove,get} = require("../dao");
const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const { log } = require("../../common");

module.exports = async request =>{
    const user = await checkRole(request.authToken,ROLE_ADMIN);
    const subject = await get({_id:request.subjectID});
    await remove(request.subjectID);
    log(user,`subject ${subject.name} removed`);
};