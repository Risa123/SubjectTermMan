const database = require("./database");

function create(subject){
 database.getSubjectCollection().insert(subject);
}
function get(id){
  return database.getSubjectCollection().findOne({_id:id});
}
function list(){
  return database.getSubjectCollection().find({});
}
function update(id,subject){
  database.getUserColection().update({_id:id},subject);
}
function remove(id){
  database.getSubjectCollection().deleteOne({_id:id});
}
module.exports = {create,get,list,update,remove};