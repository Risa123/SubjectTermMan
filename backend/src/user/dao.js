const {getUserColection,ObjectNotFoundException} = require("../database");

const ROLE_ADMIN = "admin";
const ROLE_TEACHER = "teacher";
const ROLE_STUDENT = "student";
async function get(name){
    const result = await getUserColection().findOne({name:name});
    if(!result){
       throw new ObjectNotFoundException("user not found");
    }
    return result;
}
async function checkRole(userName,role){
  if((await get(userName)).role != role){
      throw new UserNotAuthorisedException(`user with role ${role} expected`);
  }
}
class UserNotAuthorisedException extends Error{
    constructor(message){
        super(message);
    }
}
module.exports = {get,ROLE_ADMIN,ROLE_STUDENT,ROLE_TEACHER,checkRole,UserNotAuthorisedException};