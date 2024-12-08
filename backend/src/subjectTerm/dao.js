const {getSubjectTermCollection} = require("../database");

function get(id){
    return getSubjectTermCollection().findOne({_id:id});
}
async function remove(id){
    await getSubjectTermCollection().deleteOne({_id:id});
}
async function create(subjectTerm){
    await getSubjectTermCollection().insert(subjectTerm);
}
function list(){
  return database.getSubjectTermCollection().find({});
}
async function update(id,subjectTerm){
    await database.getSubjectTermCollection().updateOne({_id:id},subjectTerm);
}
module.exports = {get,remove,create,list,update};