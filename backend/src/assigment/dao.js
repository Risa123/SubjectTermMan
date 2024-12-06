const {getAssigmentCollection} = require("../database");

async function create(assigment){
    await getAssigmentCollection().insert(assigment);
}
function remove(id){
    database.getAssigmentCollection().deleteOne({_id:id})
}
function get(id){
    return database.getAssigmentCollection().findOne({_id:id})
}
async function update(id,assigment){
    await database.getAssigmentCollection().update({_id:id},assigment);
}
function list(){
  return database.getAssigmentCollection().find({});
}
module.exports = {create,remove,get,update,list};