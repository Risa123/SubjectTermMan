const {OK,route, compileValidation,STRING_MAX} = require("../../common");
const abl = require("./abl");

const validate = compileValidation({
  type:"object",
  properties:{
    userName:{
      type:"string",
      minLength:1,
      maxLength:STRING_MAX
    },
    subjectID:{
      type:"string",
      format:"uuid"
    }
  },
  required:["userName","subjectID"],
  additionalProperties:false
});
module.exports = (req,res) => route(req,res,validate,OK,abl)