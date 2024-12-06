const {getUserColection,ObjectNotFoundException} = require("../database");

const ROLE_ADMIN = "admin";
const ROLE_TEACHER = "teacher";
const ROLE_STUDENT = "student";
async function get(filter){
    const result = await getUserColection().findOne(filter);
    if(!result){
       throw new ObjectNotFoundException("user not found");
    }
    return result;
}
async function update(filter,update){
   const result = await getUserColection().updateOne(filter,update);
   if(!result){
      throw new ObjectNotFoundException("user not found");
   }
}
async function checkRole(authToken,role){
  if((await get({authToken:authToken})).role != role){
      throw new UserNotAuthorisedException(`user with role ${role} expected`);
  }
}
class UserNotAuthorisedException extends Error{
    constructor(message){
        super(message);
    }
}
module.exports = {get,ROLE_ADMIN,ROLE_STUDENT,ROLE_TEACHER,checkRole,UserNotAuthorisedException,update};