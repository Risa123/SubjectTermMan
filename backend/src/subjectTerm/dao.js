const {getSubjectTermCollection,ObjectNotFoundException} = require("../database");

async function get(filter){
    const result = await getSubjectTermCollection().findOne(filter);
    if(!result){
        throw new ObjectNotFoundException("subjectTerm not found");
    }
    return result;
}

async function remove(id){
    await getSubjectTermCollection().deleteOne({_id:id});
}

async function create(subjectTerm){
    await getSubjectTermCollection().insertOne(subjectTerm);
}

function list(){
  return database.getSubjectTermCollection().find({});
}

async function update(id,update){
    const result = await getSubjectTermCollection().updateOne({_id:id},update);
    if(result.matchedCount == 0){
        throw new ObjectNotFoundException("subjectTerm not found");
    }
}

module.exports = {get,remove,create,list,update};