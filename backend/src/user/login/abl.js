const {get} = require("../dao")

module.exports = async request => (await get(request.name)).role