const database = require("./database");

function create(assigment){
    database.getAssigmentCollection().insert(assigment)
}
function remove(id){
    database.getAssigmentCollection().deleteOne({_id:id})
}
function get(id){
    return database.getAssigmentCollection().findOne({_id:id})
}
function update(id,assigment){
    database.getAssigmentCollection().update({_id:id},assigment);
}
function list(){
  return database.getAssigmentCollection().find({});
}
module.exports = {create,remove,get,update,list};