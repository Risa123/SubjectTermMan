const {remove,get} = require("../dao");
const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const {log} = require("../../common");

module.exports = async request =>{
    const user = await checkRole(request.authToken,ROLE_ADMIN);
    const subjectTerm = await get({_id:request.subjectTerm});
    await remove(request.subjectTerm);
    log(user,`subjectTerm ${subjectTerm.name} removed`);
};