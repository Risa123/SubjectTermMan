const {update} = require("../dao");
const {checkRole,ROLE_STUDENT} = require("../../user/dao");

module.exports = async request =>{
    const user = await checkRole(request.authToken,ROLE_STUDENT);
    await update(request.subjectTerm,{"$push":{students:user._id}});
};