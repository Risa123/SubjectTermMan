const {remove,get} = require("../dao");
const {checkRole,ROLE_ADMIN} = require("../../user/dao");
const {log} = require("../../common");

module.exports = async request =>{
    const user = await checkRole(request.authToken,ROLE_ADMIN);
    const subjectTerm = await get({_id:request.subjectTermID});
    await remove(request.subjectTermID);
    console.log(subjectTerm);
    log(user,`subjectTerm ${subjectTerm.name} removed`);
};