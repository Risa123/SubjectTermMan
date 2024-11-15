const express = require("express")

const PORT = 8000
const app = express()
app.use(require("cors")())
app.use(express.json())
app.listen(PORT,() => console.log('server listening on port ${PORT}',PORT))