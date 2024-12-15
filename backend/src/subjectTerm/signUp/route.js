const {OK,route, compileValidation} = require("../../common");
const abl = require("./abl");

const validate = compileValidation({
  type:"object",
  properties:{
    authToken:{
      type:"string",
      format:"uuid"
    },
    subjectTerm:{
      type:"string",
      format:"uuid"
    }
  },
  required:["authToken","subjectTerm"],
  additionalProperties:false
});

module.exports = (req,res) => route(req,res,validate,OK,abl)