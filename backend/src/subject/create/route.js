const {CREATED,STRING_MAX,compileValidation,route} = require("../../common")
const abl = require("./abl")

const validate = compileValidation({
  type:"object",
  properties:{
    userName:{
      type:"string",
      minLength:1,
      maxLength:STRING_MAX
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
  required:["userName","name","info","credits"],
  additionalProperties:false
});
module.exports = (req,res) => route(req,res,validate,CREATED,abl)