const Ajv = require("ajv")
const {BAD_REQUEST,INTERNAL_ERROR,OK} = require("../../common");
const abl = require("./abl");

const validate = new Ajv().compile({
   type:"object",
   properties:{
     name:{type:"string"},
     password:{type:"string"}
   },
   required:["name","password"],
   additionalProperties:false
});
module.exports = (req,res) =>{
    if(validate(req.body)){
       try{
        abl(req.body)
        res.send(OK)
       }catch(e){
         console.error(e.stack)
         res.send(INTERNAL_ERROR)
       }
    }else{
        res.send(BAD_REQUEST)
    }
};