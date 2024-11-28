const database = require("./database")

function get(id){
    return database.getSubjectTermCollection().findOne({_id:id});
}
function remove(id){
    return database.getSubjectTermCollection().deleteOne({_id:id});
}
function create(subjectTerm){
    database.getSubjectTermCollection().insert(subjectTerm);
}
function list(){
  return database.getSubjectTermCollection().find({});
}
function update(id,subjectTerm){
    database.getSubjectTermCollection().update({_id:id},subjectTerm)
}
module.exports = {get,remove,create,list,update};