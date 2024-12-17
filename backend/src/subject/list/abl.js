const {list} = require("../dao");
const {get} = require("../../user/dao");
module.exports = async request =>{
     await get({authToken:request.authToken});
     return await list();
};
