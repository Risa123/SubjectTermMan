const {MongoClient} = require("mongodb");

const CONNECTION = "mongodb+srv://subjectTermMan:testX24@somecluster.zryzm.mongodb.net/?retryWrites=true&w=majority&appName=someCluster";
const mongo = new MongoClient(CONNECTION);
let userCollection,subjectCollection,subjectTermCollection,activityCollection;
async function connect(){
  try{
    await mongo.connect();
    let database = mongo.db("subjectTermMan");
    userCollection = database.collection("users");
    subjectCollection = database.collection("subjects");
    activityCollection = database.collection("activities");
    subjectTermCollection = database.collection("subjectTerms");
  }catch(e){
    await close();
    throw e;
  }
}
async function close(){
 await mongo.close();
}
function getUserColection(){
  return userCollection;
}
function getSubjectCollection(){
  return subjectCollection;
}
function getSubjectTermCollection(){
  return subjectTermCollection;
}
function getActivityCollection(){
  return activityCollection;
}
class ObjectNotFoundException extends Error{
  constructor(message){
    super(message);
  }
}
module.exports = {connect,close,getUserColection,getSubjectCollection,getSubjectTermCollection,getActivityCollection,
  ObjectNotFoundException};