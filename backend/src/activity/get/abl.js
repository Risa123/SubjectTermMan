const userDao = require("../../user/dao");
const activityDao = require("../dao");
const {log} = require("../../common");

module.exports = async request =>{
   const user = await userDao.get({authToken:request.authToken})
   const activity = await activityDao.get({_id:request.activity});
   log(user,`acessed activity ${request.activity}`);
   return activity;
};