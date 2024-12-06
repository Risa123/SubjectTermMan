const {update,get} = require("../dao")

module.exports = async request =>{
    const filter = {name:request.name,password:request.password};
    const user = await get(filter);
    const authToken = crypto.randomUUID();
    await update(filter,{"$set":{authToken:authToken}});
    console.log(`user ${user.name} logged in`);
    return {authToken:authToken,role:user.role};
};