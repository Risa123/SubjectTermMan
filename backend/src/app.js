const express = require("express")

const PORT = 8000
const app = express()
app.use(require("cors")())
app.use(express.json())
app.use("/subjectCreate",require("./subjectCreate/subjectCreateRouter"))
app.use("/subjectGetDetail",require("./subjectGetDetail/subjectGetDetailRouter"))
app.use("./userExists",require("./userExists/userExistsRouter"))
app.listen(PORT,() => console.log('server listening on port ${PORT}',PORT))