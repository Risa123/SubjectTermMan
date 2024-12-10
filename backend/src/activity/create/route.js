const {compileValidation,STRING_MAX,route,CREATED} = require("../../common");
const abl = require("./abl");

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
        term:{
            type:"string",
            format:"date"
        },
        points:{type:"integer"},
        assigment:{
            type:"string",
            minLength:1,
            maxLength:STRING_MAX
        }
    },
    required:["authToken","name","term","points","assigment"],
    additionalProperties:false
});

module.exports = (req,res) => route(req,res,validate,CREATED,abl)