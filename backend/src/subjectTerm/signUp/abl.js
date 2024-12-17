const {update} = require("../dao");
const {checkRole,ROLE_STUDENT} = require("../../user/dao");
const { log } = require("../../common");

module.exports = async request =>{
    const user = await checkRole(request.authToken,ROLE_STUDENT);
    await update(request.subjectTerm,{"$push":{students:user._id}});
    log(user,"signed up for subjectTerm")
};