const {update,get} = require("../dao")

module.exports = async request =>{
    await update({authToken:request.authToken},{"$set":{authToken:null}});
    console.log(`user ${(await get({authToken:request.authToken})).name} logged-out`);
};