const userDao = require("../../user/dao");
const activityDao = require("../dao");

module.exports = async request =>{
   await userDao.get({authToken:request.authToken})
   return await activityDao.get({_id:request.activity});
};