const express = require("express");
const {close,connect} = require("./database");

const PORT = 8000;
const app = express();

app.use(require("cors")());
app.use(express.json());
app.post("/subject/create",require("./subject/create/route"));
app.get("/subject/get",require("./subject/get/route"));
app.post("/subject/list",require("./subject/list/route"));
app.post("/user/login",require("./user/login/route"));
app.post("/user/logOff",require("./user/logOff/route"));
app.post("/activity/create",require("./activity/create/route"));
app.post("/subject/remove",require("./subject/remove/route"));
app.post("/subject/update",require("./subject/update/route"));
app.post("/activity/update",require("./activity/update/route"));
app.post("/activity/remove",require("./activity/remove/route"));
app.post("/subjectTerm/create",require("./subjectTerm/create/route"));
app.post("/subjectTerm/remove",require("./subjectTerm/remove/route"));
app.post("/subjectTerm/gradeActivity",require("./subjectTerm/gradeActivity/route"));
app.post("/subjectTerm/submit",require("./subjectTerm/submit/route"));
app.post("/subjectTerm/signUp",require("./subjectTerm/signUp/route"));


app.listen(PORT,() =>{
    connect();
    console.log(`server listening on port ${PORT}`);
});

process.on("beforeExit",_ => close());