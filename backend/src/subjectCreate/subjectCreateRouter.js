const router = require("express").Router()
const Ajv = require("ajv")
const {BAD_REQUEST,INTERNAL_ERROR,CREATED} = require("../common")
const abl = require("./subjectCreateAbl")

const validate = new Ajv().compile({
  type:"object",
  properties:{
    
  },
  required:[],
  additionalProperties:false
})
router.post("/userExists",(req,res) =>{
    if(validate(req.body)){
       try{
        abl(req.body)
        res.send(CREATED)
       }catch(e){
          console.error(e.stack)
          res.send(INTERNAL_ERROR)
       }
    }else{
        res.send(BAD_REQUEST)
    }
})

module.exports = router