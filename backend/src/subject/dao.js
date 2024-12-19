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

async function list(filter){
  return (await getSubjectCollection().find(filter)).toArray();
}

async function update(id,subject){
  await getSubjectCollection().updateOne({_id:id},subject);
}

async function remove(id){
  await getSubjectCollection().deleteOne({_id:id});
}

module.exports = {create,get,list,update,remove};