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
    teacher:request.teacher,
    activities:[],
    evaluation:{},
    students:[]
  };
  await subjectTermDao.create(subjectTerm);
  await subjectDao.update(request.subject,{"$push":{subjectTerms:subjectTerm._id}})
  log(user,`subjectTerm ${JSON.stringify(subjectTerm.name)} created`);
  return subjectTerm;
}