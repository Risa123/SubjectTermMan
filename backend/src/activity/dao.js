const {getActivityCollection} = require("../database");

async function create(assigment){
    await getActivityCollection().insertOne(assigment);
}

async function remove(id){
  await getActivityCollection().deleteOne({_id:id})
}

function get(id){
    return getActivityCollection.findOne({_id:id})
}

async function update(id,assigment){
    await getActivityCollection().updateOne({_id:id},assigment);
}

function list(){
  return getActivityCollection.find({});
}

module.exports = {create,remove,get,update,list};