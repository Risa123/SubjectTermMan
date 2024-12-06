const {update} = require("../dao")

module.exports = async request => update({authToken:request.authToken},{"$set":{authToken:null}})