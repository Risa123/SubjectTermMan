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
    },
    activity:{
      type:"string",
      format:"uuid"
    },
    student:{
     type:"string",
     format:"uuid"
    },
    points:{type:"integer"}
  },
  required:["authToken","subjectTerm","activity","student","points"],
  additionalProperties:false
});

module.exports = (req,res) => route(req,res,validate,OK,abl)