const {getActivityCollection,ObjectNotFoundException} = require("../database");

async function create(assigment){
    await getActivityCollection().insertOne(assigment);
}

async function remove(id){
  await getActivityCollection().deleteOne({_id:id});
}

function get(filter){
    const result =  getActivityCollection().findOne(filter);
    if(!result){
        throw new ObjectNotFoundException("activity not found");
    }
    return result;
}

async function update(id,assigment){
    const result = await getActivityCollection().updateOne({_id:id},assigment);
    if(result.modifiedCount == 0){
       throw new ObjectNotFoundException("activity not found");
    }
}

module.exports = {create,remove,get,update};