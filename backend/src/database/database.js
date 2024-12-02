const {MongoClient} = require("mongodb");

const CONNECTION = "mongodb+srv://subjectTermMan:nuke2050@somecluster.zryzm.mongodb.net/?retryWrites=true&w=majority&appName=someCluster";
const mongo = new MongoClient(CONNECTION);
let userCollection,subjectCollection,subjectTermCollection,assigmentCollection;
async function connect(){
  try{
    await mongo.connect();
    let database = mongo.db("subjectTermMan");
    userCollection = database.collection("users");
    subjectCollection = database.collection("subjects");
    assigmentCollection = database.collection("assigments");
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
function getAssigmentCollection(){
  return assigmentCollection;
}
module.exports = {connect,close,getUserColection,getSubjectCollection,getSubjectTermCollection,getAssigmentCollection}