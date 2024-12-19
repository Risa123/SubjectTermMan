const subjectDao = require("../dao");
const subjectTermDao = require("../../subjectTerm/dao");
const userDao = require("../../user/dao");

module.exports = async request =>{
     const student = await userDao.checkRole(request.authToken,userDao.ROLE_STUDENT);
     const subjectTerms = await subjectTermDao.list({students:student._id},{_id:1});
     const subjectTermIDs = [];
     for(const term of subjectTerms){
          subjectTermIDs.push(term._id);
     }
     return await subjectDao.list({subjectTerms:{"$in":subjectTermIDs}});
};
