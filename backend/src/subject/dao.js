const {ObjectNotFoundException,getSubjectCollection} = require("../database");

async function create(subject){
 await getSubjectCollection().insertOne(subject)
}
async function get(id){
  const result =  await getSubjectCollection().findOne({_id:id});
  if(!result){
     throw new ObjectNotFoundException("subject not found");
  }
  return result;
}
async function list(){
  return await getSubjectCollection().find({});
}
function update(id,subject){
  getUserColection().update({_id:id},subject);
}
function remove(id){
  getSubjectCollection().deleteOne({_id:id});
}
module.exports = {create,get,list,update,remove};