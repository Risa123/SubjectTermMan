const database = require("../database/database");

async function create(subject){
 await database.getSubjectCollection().insertOne(subject)
}
async function get(id){
  return await database.getSubjectCollection().findOne({_id:id});
}
async function list(){
  return await database.getSubjectCollection().find({});
}
function update(id,subject){
  database.getUserColection().update({_id:id},subject);
}
function remove(id){
  database.getSubjectCollection().deleteOne({_id:id});
}
module.exports = {create,get,list,update,remove};