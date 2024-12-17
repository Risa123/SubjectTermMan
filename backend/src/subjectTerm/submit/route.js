const { compileValidation, route, OK, STRING_MAX } = require("../../common");
const abl = require("./abl");

const validate = compileValidation({
  type: "object",
  properties: {
    authToken: { type: "string", format: "uuid" },
    activity: { type: "string", format: "uuid" },
    solution: { type: "string", minLength:1, maxLength:STRING_MAX },
    subjectTerm: { type: "string", format: "uuid"}
  },
  required: ["authToken", "activity", "solution", "subjectTerm"],
  additionalProperties: false,
});

module.exports = (req, res) => route(req, res, validate, OK, abl);