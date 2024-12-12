const {OK,route, compileValidation} = require("../../common");
const abl = require("./abl");

const validate = compileValidation({
  type:"object",
  properties:{
    authToken:{
      type:"string",
      format:"uuid"
    },
    subjectTermID:{
      type:"string",
      format:"uuid"
    }
  },
  required:["authToken","subjectTermID"],
  additionalProperties:false
});

module.exports = (req,res) => route(req,res,validate,OK,abl)