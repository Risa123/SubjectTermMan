const Ajv = require("ajv");
const {ObjectNotFoundException} = require("./database");
const {UserNotAuthorisedException} = require("./user/dao");

const ajv = new Ajv();
require("ajv-formats")(ajv);

const BAD_REQUEST = 400;
const OK = 200;
const INTERNAL_ERROR = 500;
const CREATED = 201;
const STRING_MAX = 5000;
const NOT_FOUND = 404;
const UNAUTHORISED = 401;

function compileValidation(scheme) {
  return ajv.compile(scheme);
}

function route(req, res, validate, successCode, abl) {
  if (validate(req.body)) {
     abl(req.body).then(data => res.status(successCode).json(data)).catch(e =>{
       if(e instanceof ObjectNotFoundException){
         res.status(NOT_FOUND).send(e.message);
       }else if(e instanceof UserNotAuthorisedException){
         res.status(UNAUTHORISED).send(e.message);
       }else{
        console.error(e.stack);
        res.sendStatus(INTERNAL_ERROR);
       }
     })
  } else {
    res.sendStatus(BAD_REQUEST);
  }
}

module.exports = { OK, CREATED, compileValidation, STRING_MAX, route };