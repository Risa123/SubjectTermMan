const {update,get} = require("../dao")

module.exports = async request =>{
    const filter = {name:request.name,password:request.password};
    const role = (await get(filter)).role;
    const authToken = crypto.randomUUID();
    await update(filter,{"$set":{authToken:authToken}})
    return {authToken:authToken,role:role};
}