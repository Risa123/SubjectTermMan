const {OK,STRING_MAX,compileValidation,route} = require("../../common")
const abl = require("./abl")

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
    },
    name:{
      type:"string",
      minLength:1,
      maxLength:STRING_MAX
    },
    info:{
      type:"string",
      minLength:1,
      maxLength:STRING_MAX
    },
    credits:{type:"integer"}
  },
  required:["authToken","subjectID"]
});
module.exports = (req,res) => route(req,res,validate,OK,abl)