const {getActivityCollection,ObjectNotFoundException} = require("../database");

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
    const result = await getActivityCollection().updateOne({_id:id},assigment);
    if(result.modifiedCount == 0){
       throw new ObjectNotFoundException("activity not found")
    }
}

function list(){
  return getActivityCollection.find({});
}

module.exports = {create,remove,get,update,list};