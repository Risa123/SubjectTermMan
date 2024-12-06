const {ObjectNotFoundException,getSubjectCollection} = require("../database");

async function create(subject){
 await getSubjectCollection().insertOne(subject)
}
async function get(filter){
  const result =  await getSubjectCollection().findOne(filter);
  if(!result){
     throw new ObjectNotFoundException("subject not found");
  }
  return result;
}
async function list(){
  return await getSubjectCollection().find({});
}
async function update(id,subject){
  await getUserColection().update({_id:id},subject);
}
module.exports = {create,get,list,update,remove};