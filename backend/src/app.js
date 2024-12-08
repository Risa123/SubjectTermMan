const express = require("express");
const {close,connect} = require("./database");

const PORT = 8000;
const app = express();
app.use(require("cors")());
app.use(express.json());
app.post("/subject/create",require("./subject/create/route"));
app.get("/subject/get",require("./subject/get/route"));
app.get("/subject/list",require("./subject/getList/route"));
app.post("/user/login",require("./user/login/route"));
app.post("/user/logOff",require("./user/logOff/route"));
app.post("/activity/create",require("./activity/create/route"));
app.post("/subject/remove",require("./subject/remove/route"));
app.post("/subject/update",require("./subject/update/route"));
app.listen(PORT,() =>{
    connect();
    console.log(`server listening on port ${PORT}`);
});
process.on("beforeExit",_ => close());