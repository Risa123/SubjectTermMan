const crypto = require('crypto');
const {log} = require("../../common");
const {update,get} = require("../dao")

module.exports = async request =>{
    const filter = {name:request.name,password:request.password};
    const user = await get(filter);
    const authToken = crypto.randomUUID();
    await update(filter,{"$set":{authToken:authToken}});
    log(user,"logged in");
    return {authToken:authToken,role:user.role};
};