const {compileValidation,route,OK} = require("../../common");
const abl = require("./abl");

const validate = compileValidation({
    type:"object",
    properties:{
        authToken:{
            type:"string",
            format:"uuid"
        },
        activityID:{
            type:"string",
            format:"uuid"
        }
    },
    required:["authToken","activityID"],
    additionalProperties:false
});

module.exports = (req,res) => route(req,res,validate,OK,abl)