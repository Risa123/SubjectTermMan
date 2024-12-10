const {OK,route, compileValidation} = require("../../common");
const abl = require("./abl");

const validate = compileValidation({
  type:"object",
  properties:{
    authToken:{
      type:"string",
      format:"uuid"
    },
    subjectID:{
      type:"string",
      format:"uuid"
    }
  },
  required:["authToken","subjectID"],
  additionalProperties:false
});

module.exports = (req,res) => route(req,res,validate,OK,abl)