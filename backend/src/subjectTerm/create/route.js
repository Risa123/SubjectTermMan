const {CREATED,STRING_MAX,compileValidation,route} = require("../../common")
const abl = require("./abl")

const validate = compileValidation({
  type:"object",
  properties:{
    authToken:{
      type:"string",
      format:"uuid"
    },
    name:{
      type:"string",
      minLength:1,
      maxLength:STRING_MAX
    },
    subject:{
      type:"string",
      format:"uuid"
    },
    teacher:{
      type:"string",
      format:"uuid"
    }
  },
  required:["authToken","name","subject","teacher"],
  additionalProperties:false
});

module.exports = (req,res) => route(req,res,validate,CREATED,abl)