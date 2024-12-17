const subjectTermDao = require("../dao");
const userDao = require("../../user/dao");
const subjectDao = require("../../subject/dao");
const {log} = require("../../common");

module.exports = async request =>{
  const user = await userDao.checkRole(request.authToken,userDao.ROLE_ADMIN);
  await subjectDao.get({_id:request.subject})
  await userDao.get({_id:request.teacher})
  const subjectTerm = {
    _id:crypto.randomUUID(),
    name:request.name,
    subject:request.subject,
    teacher:request.teacher,
    activities:[],
    evaluation:{},
    students:[]
  };
  await subjectTermDao.create(subjectTerm);
  log(user,`subjectTerm ${JSON.stringify(subjectTerm.name)} created`);
  return subjectTerm;
}