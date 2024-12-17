const {log} = require("../../common");
const {update,get} = require("../dao")

module.exports = async request =>{
    const  user = await get({authToken:request.authToken});
    await update({authToken:request.authToken},{"$set":{authToken:null}});
    log(user,"logged out");
};