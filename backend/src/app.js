const express = require("express");
const database = require("./database")

const PORT = 8000;
const app = express();
app.use(require("cors")());
app.use(express.json());
app.post("/subject/create",require("./subject/create/route"));
app.get("/subject/get",require("./subject/get/route"));
app.get("/subject/getList",require("./subject/getList/route"));
app.post("/user/validate",require("./user/validate/route"));
app.listen(PORT,() =>{
    database.connect();
    console.log(`server listening on port ${PORT}`);
});
process.on("beforeExit",_ => database.close());